import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowDashEngine } from './engine/gameEngine';
import { GameState, GameStats } from './types';
import { MobileJoystick } from './components/MobileJoystick';
import { soundEffects } from './engine/audio';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Star,
  Zap,
  Maximize2,
  Minimize2,
  ShieldAlert,
  Smartphone,
  Keyboard,
  Compass,
} from 'lucide-react';

const BEST_SCORE_STORAGE_KEY = 'mirthloop_arrow_dash_best_score_v1';

export const ArrowDashGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<ArrowDashEngine | null>(null);

  // React state for UI overlays & HUD
  const [gameState, setGameState] = useState<GameState>('ready');
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [starsCount, setStarsCount] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(BEST_SCORE_STORAGE_KEY);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [finalStats, setFinalStats] = useState<GameStats | null>(null);
  const [showTouchHint, setShowTouchHint] = useState<boolean>(true);

  // Initialize Game Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const virtualWidth = 800;
    const virtualHeight = 600;

    canvas.width = virtualWidth * dpr;
    canvas.height = virtualHeight * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    const engine = new ArrowDashEngine(canvas, {
      onScoreUpdate: (score) => setCurrentScore(score),
      onStarsUpdate: (stars) => setStarsCount(stars),
      onLevelUp: (lvl) => setLevel(lvl),
      onGameOver: (stats) => {
        setGameState('gameover');
        setFinalStats(stats);
        if (stats.score > bestScore) {
          setBestScore(stats.score);
          try {
            localStorage.setItem(BEST_SCORE_STORAGE_KEY, stats.score.toString());
          } catch {
            // LocalStorage might be restricted
          }
        }
      },
    });

    engineRef.current = engine;
    engine.render(); // Initial idle render

    return () => {
      engine.stop();
    };
  }, [bestScore]);

  // Tab visibility change handler (auto pause)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && gameState === 'playing' && engineRef.current) {
        engineRef.current.pause();
        setGameState('paused');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gameState]);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      if (!engine) return;

      // Prevent scroll on arrow keys and spacebar during game interaction
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        if (document.activeElement === canvasRef.current || gameState === 'playing') {
          e.preventDefault();
        }
      }

      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        if (gameState === 'playing') {
          engine.pause();
          setGameState('paused');
        } else if (gameState === 'paused') {
          engine.resume();
          setGameState('playing');
        }
        return;
      }

      if ((e.key === 'r' || e.key === 'R') && (gameState === 'playing' || gameState === 'gameover')) {
        handleStartOrRestart();
        return;
      }

      // Movement input
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') engine.keys.up = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') engine.keys.down = true;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') engine.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') engine.keys.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      if (!engine) return;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') engine.keys.up = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') engine.keys.down = false;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') engine.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') engine.keys.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Touch Screen Helper: convert viewport/client pixels to canvas virtual 800x600 space
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 400, y: 300 };
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 800;
    const y = ((clientY - rect.top) / rect.height) * 600;
    return {
      x: Math.max(0, Math.min(800, x)),
      y: Math.max(0, Math.min(600, y)),
    };
  };

  // Touch Screen event handlers: Direct On-Screen Thumb Steering with Floating Joystick
  const touchOriginRef = useRef<{ x: number; y: number; id: number } | null>(null);
  const isMouseDownRef = useRef(false);

  const processVector = (currentX: number, currentY: number) => {
    if (!engineRef.current || !touchOriginRef.current) return;
    const origin = touchOriginRef.current;
    const dx = currentX - origin.x;
    const dy = currentY - origin.y;
    const dist = Math.hypot(dx, dy);

    const maxRadius = 55;
    const deadzone = 5;

    let vx = 0;
    let vy = 0;
    let knobX = origin.x;
    let knobY = origin.y;

    if (dist > deadzone) {
      const clampedDist = Math.min(dist, maxRadius);
      const normX = dx / dist;
      const normY = dy / dist;
      const intensity = Math.min(1, (dist - deadzone) / (maxRadius - deadzone));

      vx = normX * intensity;
      vy = normY * intensity;

      knobX = origin.x + normX * clampedDist;
      knobY = origin.y + normY * clampedDist;
    }

    engineRef.current.updateTouch(true, origin.x, origin.y, knobX, knobY, vx, vy);
  };

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || !engineRef.current) return;
    if (e.cancelable) e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const coords = getCanvasCoords(touch.clientX, touch.clientY);
      touchOriginRef.current = { x: coords.x, y: coords.y, id: touch.identifier };
      engineRef.current.updateTouch(true, coords.x, coords.y, coords.x, coords.y, 0, 0);
      setShowTouchHint(false);
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || !engineRef.current || !touchOriginRef.current) return;
    if (e.cancelable) e.preventDefault();

    let activeTouch: React.Touch | null = null;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === touchOriginRef.current.id) {
        activeTouch = e.touches[i];
        break;
      }
    }
    if (!activeTouch) activeTouch = e.touches[0];

    const currentCoords = getCanvasCoords(activeTouch.clientX, activeTouch.clientY);
    processVector(currentCoords.x, currentCoords.y);
  };

  const handleCanvasTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) e.preventDefault();
    touchOriginRef.current = null;
    if (engineRef.current) {
      engineRef.current.updateTouch(false);
    }
  };

  // Mouse drag support for on-screen touch testing on desktop
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || !engineRef.current) return;
    const coords = getCanvasCoords(e.clientX, e.clientY);
    isMouseDownRef.current = true;
    touchOriginRef.current = { x: coords.x, y: coords.y, id: -1 };
    engineRef.current.updateTouch(true, coords.x, coords.y, coords.x, coords.y, 0, 0);
    setShowTouchHint(false);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDownRef.current || gameState !== 'playing' || !engineRef.current || !touchOriginRef.current) return;
    const currentCoords = getCanvasCoords(e.clientX, e.clientY);
    processVector(currentCoords.x, currentCoords.y);
  };

  const handleCanvasMouseUp = () => {
    isMouseDownRef.current = false;
    touchOriginRef.current = null;
    if (engineRef.current) {
      engineRef.current.updateTouch(false);
    }
  };

  // Actions
  const handleStartOrRestart = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.start();
      setGameState('playing');
      setCurrentScore(0);
      setStarsCount(0);
      setLevel(1);
      setShowTouchHint(true);
    }
  }, []);

  const handlePauseResume = useCallback(() => {
    if (!engineRef.current) return;
    if (gameState === 'playing') {
      engineRef.current.pause();
      setGameState('paused');
    } else if (gameState === 'paused') {
      engineRef.current.resume();
      setGameState('playing');
    }
  }, [gameState]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEffects.enabled = !nextMuted;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleJoystickMove = useCallback((vector: { x: number; y: number }) => {
    if (engineRef.current) {
      engineRef.current.updateTouch(true, 0, 0, 0, 0, vector.x, vector.y);
      setShowTouchHint(false);
    }
  }, []);

  const handleJoystickEnd = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.updateTouch(false);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center select-none" ref={containerRef}>
      {/* Top Game HUD Bar */}
      <div className="w-full max-w-4xl bg-[#121729] border border-[#232C4F] rounded-t-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Score & Stars */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] uppercase font-extrabold tracking-wider text-slate-400">Score</span>
            <span className="font-mono text-xl sm:text-2xl font-black text-cyan-300">
              {currentScore.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-mono text-sm font-bold">{starsCount}</span>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase">LVL {level}</span>
          </div>
        </div>

        {/* High Score & Controls Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span>Best:</span>
            <span className="font-mono font-bold text-white">{bestScore.toLocaleString()}</span>
          </div>

          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {gameState === 'playing' && (
            <button
              onClick={handlePauseResume}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          )}

          {gameState === 'paused' && (
            <button
              onClick={handlePauseResume}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Resume</span>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Game Screen with Canvas & Direct On-Screen Controls */}
      <div className="relative w-full max-w-4xl aspect-[4/3] bg-[#0A0D18] border-x border-b border-[#232C4F] overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          onTouchStart={handleCanvasTouchStart}
          onTouchMove={handleCanvasTouchMove}
          onTouchEnd={handleCanvasTouchEnd}
          onTouchCancel={handleCanvasTouchEnd}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          className="w-full h-full block touch-none cursor-crosshair focus:outline-none"
          style={{ imageRendering: 'auto' }}
          aria-label="Arrow Dash Playable Canvas Area with Touch Screen Controls"
        />

        {/* On-Screen Touch Controls Indicator Badge (Fades after touch) */}
        {gameState === 'playing' && showTouchHint && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none px-4 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-medium flex items-center space-x-2 animate-pulse shadow-lg">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Touch anywhere on screen & drag to steer</span>
          </div>
        )}

        {/* Ready / Start Overlay */}
        {gameState === 'ready' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/75 backdrop-blur-sm text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold uppercase tracking-wider mb-4 animate-bounce">
              <span>Pure Touch Screen Arcade</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
              ARROW <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">DASH</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-md mb-6 leading-relaxed">
              Dodge incoming plasma hazards, collect luminous stars, and surge up the leaderboard.
            </p>

            <button
              onClick={handleStartOrRestart}
              className="px-8 py-3.5 rounded-2xl text-base sm:text-lg font-extrabold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-glow-purple hover:scale-105 transition-all flex items-center space-x-2.5"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>LAUNCH GAME</span>
            </button>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1 text-cyan-300 font-semibold">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile: Touch & Drag Screen to Steer</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-slate-300">
                <Keyboard className="w-3.5 h-3.5" />
                <span>Desktop: Arrow Keys / WASD</span>
              </span>
            </div>
          </div>
        )}

        {/* Paused Overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-md text-center">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">
              <Pause className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">GAME PAUSED</h3>
            <p className="text-xs text-slate-400 mb-6">Take a breather, the plasma hazard is on hold</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePauseResume}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md hover:brightness-110 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Resume Run</span>
              </button>
              <button
                onClick={handleStartOrRestart}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && finalStats && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/85 backdrop-blur-md text-center">
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-2 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-1">RUN TERMINATED</h3>
            <p className="text-xs text-slate-400 mb-5">Plasma hazard collision detected</p>

            {/* Stats Breakdown Card */}
            <div className="w-full max-w-xs bg-[#121729] border border-[#232C4F] rounded-2xl p-4 mb-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Final Score:</span>
                <span className="font-mono text-xl font-extrabold text-cyan-300">
                  {finalStats.score.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Stars Collected:</span>
                <span className="font-mono font-bold text-amber-300 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>{finalStats.starsCollected}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Time Survived:</span>
                <span className="font-mono font-bold text-slate-200">{finalStats.timeSurvived}s</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-[#232C4F] pt-2">
                <span className="text-slate-400">All-Time Best:</span>
                <span className="font-mono font-bold text-yellow-400">{bestScore.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleStartOrRestart}
              className="px-8 py-3 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-glow-purple hover:scale-105 transition-all flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>PLAY AGAIN</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls Console with Virtual Analog Joystick */}
      <div className="w-full max-w-4xl bg-[#0E1324] border-x border-b border-[#232C4F] rounded-b-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* Dedicated 360° Analog Joystick */}
        <div className="w-full sm:w-auto flex flex-col items-center">
          <MobileJoystick
            onMove={handleJoystickMove}
            onEnd={handleJoystickEnd}
            disabled={gameState !== 'playing'}
          />
        </div>

        {/* Quick Action Controls & Status */}
        <div className="flex flex-col items-center sm:items-start space-y-3 w-full sm:w-auto">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold text-white">Mobile Joystick Controls</span>
            <span className="text-slate-400">• Drag stick or screen to steer</span>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto justify-center">
            {gameState === 'playing' ? (
              <button
                onClick={handlePauseResume}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Pause Run</span>
              </button>
            ) : (
              <button
                onClick={handleStartOrRestart}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold shadow-glow-button flex items-center justify-center space-x-2 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{gameState === 'gameover' ? 'Play Again' : 'Start Run'}</span>
              </button>
            )}

            <button
              onClick={handleStartOrRestart}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
