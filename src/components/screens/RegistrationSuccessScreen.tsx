'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { CheckCircle2 } from 'lucide-react';

interface RegistrationSuccessScreenProps {
  variant?: 'default' | 'alt';
}

export function RegistrationSuccessScreen({ variant = 'default' }: RegistrationSuccessScreenProps) {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, texts } = useCustomizationStore();

  return (
    <div
      className="mobile-screen flex flex-col items-center justify-center px-8"
      style={{ backgroundColor }}
    >
      {/* Success icon */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <CheckCircle2 size={48} style={{ color: primaryColor }} />
      </div>

      {/* Text */}
      <h1
        className="text-2xl font-bold text-center mb-3"
        style={{ color: textPrimaryColor }}
      >
        {texts.registrationSuccessTitle}
      </h1>
      <p
        className="text-base text-center mb-12"
        style={{ color: textSecondaryColor }}
      >
        {texts.registrationSuccessDesc}
      </p>

      {/* Button */}
      <button
        className="w-full py-4 rounded-full text-base font-semibold text-white"
        style={{ backgroundColor: primaryColor }}
      >
        {texts.registrationSuccessButton}
      </button>

      {variant === 'alt' && (
        <button
          className="mt-4 text-sm font-medium"
          style={{ color: primaryColor }}
        >
          Skip for now
        </button>
      )}
    </div>
  );
}
