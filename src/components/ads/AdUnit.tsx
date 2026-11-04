import React, { useEffect } from 'react';
import { adConfig } from '../../config/ads';
import { useCookieConsent } from '../consent/CookieContext';
import { AdPlaceholder } from './AdPlaceholder';
import { AdFormat } from '../../types/ads';

interface AdUnitProps {
  slotId?: string;
  format?: AdFormat;
  className?: string;
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({
  slotId,
  format = 'responsive',
  className = '',
  label = 'Advertisement',
}) => {
  const { preferences } = useCookieConsent();

  const isAdActive =
    adConfig.enabled &&
    adConfig.publisherId &&
    slotId &&
    preferences.advertising;

  useEffect(() => {
    if (isAdActive) {
      try {
        // Safe Google AdSense execution for future enabled state
        const win = window as unknown as { adsbygoogle?: unknown[] };
        win.adsbygoogle = win.adsbygoogle || [];
        win.adsbygoogle.push({});
      } catch (err) {
        console.warn('AdSense render skipped:', err);
      }
    }
  }, [isAdActive]);

  // If ads are not yet activated or consent is missing, show clean compliant placeholder
  if (!isAdActive) {
    return <AdPlaceholder format={format} label={label} className={className} />;
  }

  return (
    <aside
      aria-label="Advertisement area"
      className={`ad-container flex flex-col items-center my-6 overflow-hidden ${className}`}
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">
        {label}
      </span>
      <div className="w-full flex justify-center items-center min-h-[90px] bg-[#0E1322] border border-[#232C4F] rounded-xl overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client={adConfig.publisherId}
          data-ad-slot={slotId}
          data-ad-format={format === 'responsive' ? 'auto' : undefined}
          data-full-width-responsive={format === 'responsive' ? 'true' : 'false'}
        />
      </div>
    </aside>
  );
};
