'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';

export function BiometricSetupScreen() {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, setCurrentScreen } = useCustomizationStore();
  const typography = useTypography();

  return (
    <div className="mobile-screen flex flex-col" style={{ backgroundColor, fontFamily: typography.fontFamily }}>
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="mb-10">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="94" r="52" stroke={primaryColor} strokeOpacity="0.3" strokeWidth="2" />
            <path d="M60 166H160" stroke={primaryColor} strokeOpacity="0.35" strokeWidth="2" />
            <rect x="42" y="52" width="38" height="34" rx="6" fill={`${primaryColor}20`} stroke={primaryColor} strokeWidth="2" />
            <circle cx="60" cy="69" r="2.5" fill={primaryColor} />
            <path d="M115 60C95 60 80 76 80 96C80 116 95 132 115 132C135 132 150 116 150 96C150 76 135 60 115 60Z" fill={`${primaryColor}12`} />
            <circle cx="148" cy="70" r="15" fill={`${primaryColor}12`} stroke={primaryColor} strokeWidth="2" />
            <path d="M143 69C143 65 146 62 150 62C154 62 157 65 157 69C157 73 154 76 150 76" stroke={primaryColor} strokeWidth="2" />
            <path d="M150 76V79" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-center mb-3" style={{ ...typography.h2, color: textPrimaryColor }}>
          Set up Biometric Login
        </h1>
        <p className="text-center" style={{ ...typography.body, color: textSecondaryColor }}>
          Use your biometric log in for a smoother and quicker experience
        </p>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={() => setCurrentScreen('choose-auth')}
          className="w-full py-4 rounded-full text-white"
          style={{ ...typography.button, backgroundColor: primaryColor }}
        >
          Enable Biometric
        </button>
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-full py-3.5 rounded-2xl border"
          style={{ ...typography.body, color: textPrimaryColor, borderColor: '#D1D5DB', fontWeight: 500 }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
