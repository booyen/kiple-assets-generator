'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';

interface BiometricScreenProps {
  type: 'touch' | 'face';
}

export function BiometricScreen({ type }: BiometricScreenProps) {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, texts } = useCustomizationStore();

  const title = type === 'touch' ? texts.touchIdTitle : texts.faceIdTitle;
  const desc = type === 'touch' ? texts.touchIdDesc : texts.faceIdDesc;

  return (
    <div
      className="mobile-screen flex flex-col items-center justify-center px-8"
      style={{ backgroundColor }}
    >
      {/* Icon */}
      <div className="mb-8">
        {type === 'touch' ? (
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke={textSecondaryColor} strokeWidth="2" />
            <path
              d="M50 25C50 25 35 30 35 50C35 70 50 75 50 75"
              stroke={textPrimaryColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 30C50 30 40 35 40 50C40 65 50 70 50 70"
              stroke={textPrimaryColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 35C50 35 45 40 45 50C45 60 50 65 50 65"
              stroke={textPrimaryColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 40C50 40 48 45 48 50C48 55 50 60 50 60"
              stroke={textPrimaryColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 25V75"
              stroke={textPrimaryColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
          </svg>
        ) : (
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke={textSecondaryColor} strokeWidth="2" />
            <circle cx="35" cy="42" r="5" fill={textPrimaryColor} />
            <circle cx="65" cy="42" r="5" fill={textPrimaryColor} />
            <path
              d="M35 60C35 60 42 70 50 70C58 70 65 60 65 60"
              stroke={textPrimaryColor}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="20" y="20" width="10" height="3" rx="1" fill={textSecondaryColor} />
            <rect x="20" y="20" width="3" height="10" rx="1" fill={textSecondaryColor} />
            <rect x="70" y="20" width="10" height="3" rx="1" fill={textSecondaryColor} />
            <rect x="77" y="20" width="3" height="10" rx="1" fill={textSecondaryColor} />
            <rect x="20" y="77" width="10" height="3" rx="1" fill={textSecondaryColor} />
            <rect x="20" y="70" width="3" height="10" rx="1" fill={textSecondaryColor} />
            <rect x="70" y="77" width="10" height="3" rx="1" fill={textSecondaryColor} />
            <rect x="77" y="70" width="3" height="10" rx="1" fill={textSecondaryColor} />
          </svg>
        )}
      </div>

      {/* Text */}
      <h1
        className="text-2xl font-bold text-center mb-3"
        style={{ color: textPrimaryColor }}
      >
        {title}
      </h1>
      <p
        className="text-base text-center"
        style={{ color: textSecondaryColor }}
      >
        {desc}
      </p>
    </div>
  );
}
