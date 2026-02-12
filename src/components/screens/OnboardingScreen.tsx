'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';

interface OnboardingScreenProps {
  variant: 1 | 2 | 3 | 4 | 5;
}

export function OnboardingScreen({ variant }: OnboardingScreenProps) {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, texts } = useCustomizationStore();
  const typography = useTypography();

  const content: Record<number, { title: string; desc: string }> = {
    1: { title: texts.onboarding1Title, desc: texts.onboarding1Desc },
    2: { title: texts.onboarding2Title, desc: texts.onboarding2Desc },
    3: { title: texts.onboarding3Title, desc: texts.onboarding3Desc },
    4: { title: texts.onboarding4Title, desc: texts.onboarding4Desc },
    5: { title: texts.onboarding5Title, desc: texts.onboarding5Desc },
  };

  const { title, desc } = content[variant];

  // Dots indicator
  const dots = [1, 2, 3, 4, 5];

  return (
    <div
      className="mobile-screen flex flex-col"
      style={{ backgroundColor, fontFamily: typography.fontFamily }}
    >
      {/* Illustration area */}
      <div className="flex-1 flex items-center justify-center px-8 pt-20">
        <div
          className="w-64 h-64 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          {/* Placeholder for illustration */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="50" stroke={primaryColor} strokeWidth="2" strokeDasharray="8 4" />
            <circle cx="60" cy="60" r="30" fill={`${primaryColor}20`} />
            <path
              d="M45 60 L55 70 L75 50"
              stroke={primaryColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        <h1
          className="text-center mb-3"
          style={{ ...typography.h2, color: textPrimaryColor }}
        >
          {title}
        </h1>
        <p
          className="text-center leading-relaxed"
          style={{ ...typography.body, color: textSecondaryColor }}
        >
          {desc}
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 mb-8">
          {dots.map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-all ${
                dot === variant ? 'w-6' : ''
              }`}
              style={{
                backgroundColor: dot === variant ? primaryColor : '#E5E7EB',
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-0">
          <button
            className="flex-1 py-4"
            style={{ ...typography.button, color: primaryColor }}
          >
            Login
          </button>
          <button
            className="flex-1 py-4 text-white rounded-tr-3xl rounded-br-3xl"
            style={{ ...typography.button, backgroundColor: primaryColor }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
