import React, { useRef, useState, useCallback, useEffect } from 'react';

interface MobileJoystickProps {
  onMove: (vector: { x: number; y: number }) => void;
  onEnd: () => void;
  disabled?: boolean;
}

export const MobileJoystick: React.FC<MobileJoystickProps> = ({
  onMove,
  onEnd,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const activeTouchIdRef = useRef<number | null>(null);

  const maxRadius = 45; // Max radius the knob can travel from center
  const deadzone = 4; // Deadzone threshold in pixels

  const handlePointerStart = (clientX: number, clientY: number, touchId: number | null = null) => {
    if (disabled) return;
    activeTouchIdRef.current = touchId;
    setIsDragging(true);
    handlePointerMove(clientX, clientY);
  };

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const dist = Math.hypot(dx, dy);

    if (dist <= deadzone) {
      setKnobPos({ x: 0, y: 0 });
      onMove({ x: 0, y: 0 });
      return;
    }

    const clampedDist = Math.min(dist, maxRadius);
    const normX = dx / dist;
    const normY = dy / dist;

    // Analog intensity from 0 to 1
    const intensity = Math.min(1, (clampedDist - deadzone) / (maxRadius - deadzone));

    const knobX = normX * clampedDist;
    const knobY = normY * clampedDist;

    setKnobPos({ x: knobX, y: knobY });
    onMove({ x: normX * intensity, y: normY * intensity });
  }, [disabled, maxRadius, deadzone, onMove]);

  const handlePointerEnd = useCallback(() => {
    setIsDragging(false);
    activeTouchIdRef.current = null;
    setKnobPos({ x: 0, y: 0 });
    onEnd();
  }, [onEnd]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    if (e.cancelable) e.preventDefault();
    const touch = e.changedTouches[0];
    handlePointerStart(touch.clientX, touch.clientY, touch.identifier);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || disabled) return;
    if (e.cancelable) e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === activeTouchIdRef.current) {
        handlePointerMove(e.touches[i].clientX, e.touches[i].clientY);
        break;
      }
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.cancelable) e.preventDefault();
    handlePointerEnd();
  };

  // Mouse handlers for desktop testing
  const onMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    handlePointerStart(e.clientX, e.clientY);
  };

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (isDragging && activeTouchIdRef.current === null) {
        handlePointerMove(e.clientX, e.clientY);
      }
    };
    const onWindowMouseUp = () => {
      if (isDragging && activeTouchIdRef.current === null) {
        handlePointerEnd();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', onWindowMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    };
  }, [isDragging, handlePointerMove, handlePointerEnd]);

  return (
    <div className="flex flex-col items-center select-none touch-none">
      {/* Outer Joystick Base Ring */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onMouseDown={onMouseDown}
        className={`relative w-36 h-36 rounded-full border-2 bg-gradient-to-b from-[#12182D]/90 to-[#0A0D18]/95 backdrop-blur-md flex items-center justify-center cursor-pointer transition-shadow ${
          isDragging
            ? 'border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
            : 'border-[#2D3962] hover:border-purple-500/60 shadow-lg'
        } ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
        aria-label="Mobile Virtual Analog Joystick"
        role="slider"
        aria-valuetext={`X: ${knobPos.x.toFixed(0)}, Y: ${knobPos.y.toFixed(0)}`}
      >
        {/* Subtle Cardinal Direction Indicators */}
        <div className="absolute top-2 w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
        <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
        <div className="absolute left-2 w-1.5 h-1.5 rounded-full bg-purple-400/50" />
        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-purple-400/50" />

        {/* Center Target Neutral Zone */}
        <div className="w-8 h-8 rounded-full border border-dashed border-slate-700 pointer-events-none flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        </div>

        {/* Movable Thumb Stick / Knob */}
        <div
          className={`absolute w-14 h-14 rounded-full flex items-center justify-center pointer-events-none shadow-xl ${
            isDragging
              ? 'bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-105'
              : 'bg-gradient-to-tr from-[#1E2746] to-[#2D3A65] border border-cyan-500/40 shadow-md'
          }`}
          style={{
            transform: `translate3d(${knobPos.x}px, ${knobPos.y}px, 0)`,
            transition: isDragging
              ? 'none'
              : 'transform 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
        >
          {/* Inner Knob Grip Ring */}
          <div
            className={`w-7 h-7 rounded-full border flex items-center justify-center ${
              isDragging
                ? 'border-white/70 bg-white/20'
                : 'border-cyan-400/30 bg-[#0E1324]/50'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isDragging ? 'bg-white' : 'bg-cyan-400'
              }`}
            />
          </div>
        </div>
      </div>
      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-2">
        360° Analog Joystick
      </span>
    </div>
  );
};
