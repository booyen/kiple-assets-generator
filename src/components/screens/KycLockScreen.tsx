'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { StatusBar } from './shared/StatusBar';
import { Shield } from 'lucide-react';

export function KycLockScreen() {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, texts } = useCustomizationStore();

  return (
    <div className="mobile-screen flex flex-col" style={{ backgroundColor }}>
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Illustration */}
        <div className="mb-8">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shield background */}
            <path
              d="M100 20L160 50V110C160 150 130 180 100 190C70 180 40 150 40 110V50L100 20Z"
              fill={`${primaryColor}10`}
              stroke={primaryColor}
              strokeWidth="2"
            />
            {/* Person */}
            <circle cx="100" cy="80" r="20" fill={`${primaryColor}30`} />
            <path
              d="M70 140C70 120 85 105 100 105C115 105 130 120 130 140"
              fill={`${primaryColor}30`}
            />
            {/* Sword */}
            <rect x="150" y="60" width="8" height="60" rx="2" fill="#F5D0C5" />
            <rect x="145" y="55" width="18" height="10" rx="2" fill={primaryColor} />
            <polygon points="154,120 154,140 150,135 158,135" fill="#E5E7EB" />
          </svg>
        </div>

        {/* Text */}
        <h1
          className="text-2xl font-bold text-center mb-3"
          style={{ color: textPrimaryColor }}
        >
          {texts.kycLockTitle}
        </h1>
        <p
          className="text-base text-center leading-relaxed"
          style={{ color: textSecondaryColor }}
        >
          {texts.kycLockDesc}
        </p>
      </div>

      {/* Button */}
      <div className="px-6 pb-10">
        <button
          className="w-full py-4 rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {texts.kycLockButton}
        </button>
      </div>
    </div>
  );
}
