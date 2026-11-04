import React from 'react';
import { AdFormat } from '../../types/ads';

interface AdPlaceholderProps {
  format?: AdFormat;
  label?: string;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'responsive',
  label = 'Advertisement Reservation',
  className = '',
}) => {
  // Dimension hints based on standard IAB display formats
  const getFormatStyle = () => {
    switch (format) {
      case 'leaderboard':
        return 'min-h-[90px] max-w-[728px]';
      case 'rectangle':
        return 'min-h-[250px] max-w-[300px]';
      case 'banner':
        return 'min-h-[60px] max-w-[468px]';
      case 'responsive':
      default:
        return 'min-h-[100px] w-full';
    }
  };

  return (
    <aside
      aria-label="Advertisement area"
      className={`mx-auto flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-[#232C4F] bg-[#0E1322]/60 text-slate-500 transition-colors select-none ${getFormatStyle()} ${className}`}
    >
      <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
        <span>{label}</span>
      </div>
      <p className="text-xs text-slate-400 text-center max-w-sm">
        Reserved ad placement space. Ads are disabled until verified publisher approval.
      </p>
    </aside>
  );
};
