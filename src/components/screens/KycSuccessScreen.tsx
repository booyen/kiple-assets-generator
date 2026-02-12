'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { CheckCircle2 } from 'lucide-react';

export function KycSuccessScreen() {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor } = useCustomizationStore();

  return (
    <div
      className="mobile-screen flex flex-col items-center justify-center px-8"
      style={{ backgroundColor }}
    >
      {/* Success icon */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
        style={{ backgroundColor: '#DCFCE7' }}
      >
        <CheckCircle2 size={48} style={{ color: '#22C55E' }} />
      </div>

      {/* Text */}
      <h1
        className="text-2xl font-bold text-center mb-3"
        style={{ color: textPrimaryColor }}
      >
        Verification Complete!
      </h1>
      <p
        className="text-base text-center mb-12"
        style={{ color: textSecondaryColor }}
      >
        Your identity has been successfully verified. You now have full access to all features.
      </p>

      {/* Button */}
      <button
        className="w-full py-4 rounded-full text-base font-semibold text-white"
        style={{ backgroundColor: primaryColor }}
      >
        Continue to App
      </button>
    </div>
  );
}
