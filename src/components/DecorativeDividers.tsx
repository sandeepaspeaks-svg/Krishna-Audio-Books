import React from 'react';

export const GoldLineDivider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold-base to-transparent opacity-60"></div>
      <div className="mx-4 flex items-center justify-center text-gold-base opacity-80 shrink-0">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4L14 10L20 12L14 14L12 20L10 14L4 12L10 10L12 4Z" fill="currentColor" />
        </svg>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold-base to-transparent opacity-60"></div>
    </div>
  );
};

export const ElegantFlourish: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center my-6 ${className}`}>
      <svg className="w-40 h-8 text-gold-base opacity-75" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M100 20 C70 20, 60 5, 40 20 C30 27, 20 20, 10 20 M100 20 C130 20, 140 5, 160 20 C170 27, 180 20, 190 20" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        <circle cx="100" cy="20" r="4" fill="currentColor" />
        <circle cx="100" cy="10" r="2" fill="currentColor" />
        <circle cx="100" cy="30" r="2" fill="currentColor" />
        <path d="M100 5 L100 15 M100 25 L100 35" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export const LotusFlowerIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12 text-gold-base" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15 C52 35 48 55 50 85 C52 55 48 35 50 15 Z" opacity="0.9" />
      <path d="M50 25 C62 42 68 58 60 85 C48 68 42 42 50 25 Z" opacity="0.8" />
      <path d="M50 25 C38 42 32 58 40 85 C52 68 58 42 50 25 Z" opacity="0.8" />
      <path d="M50 35 C72 50 78 68 68 85 C48 78 42 58 50 35 Z" opacity="0.7" />
      <path d="M50 35 C28 50 22 68 32 85 C52 78 58 58 50 35 Z" opacity="0.7" />
      <path d="M50 48 C82 62 82 78 72 85 C48 85 42 68 50 48 Z" opacity="0.6" />
      <path d="M50 48 C18 62 18 78 28 85 C52 85 58 68 50 48 Z" opacity="0.6" />
    </svg>
  );
};

export const MandalaIcon: React.FC<{ className?: string }> = ({ className = "w-20 h-20 text-gold-base" }) => {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="38" />
      <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x2 = 50 + Math.cos(angle) * 38;
        const y2 = 50 + Math.sin(angle) * 38;
        return <line key={i} x1="50" y1="50" x2={x2} y2={y2} strokeWidth="0.75" opacity="0.7" />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 50 + Math.cos(angle) * 24;
        const cy = 50 + Math.sin(angle) * 24;
        return <circle key={i} cx={cx} cy={cy} r="12" strokeWidth="0.5" opacity="0.5" />;
      })}
    </svg>
  );
};
