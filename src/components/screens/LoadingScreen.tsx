'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';

interface LoadingScreenProps {
  variant?: 'default' | 'alt';
}

export function LoadingScreen({ variant = 'default' }: LoadingScreenProps) {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, texts } = useCustomizationStore();

  return (
    <div
      className="mobile-screen flex flex-col items-center justify-center px-8"
      style={{ backgroundColor }}
    >
      {/* Spinner */}
      <div className="relative mb-8">
        <div
          className="w-20 h-20 rounded-full border-4 border-slate-200"
          style={{ borderTopColor: primaryColor }}
        >
          <style jsx>{`
            div {
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
        {variant === 'alt' && (
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: `${primaryColor}20` }}
            />
          </div>
        )}
      </div>

      {/* Text */}
      <p
        className="text-base text-center"
        style={{ color: textSecondaryColor }}
      >
        {texts.loadingText}
      </p>

      {variant === 'alt' && (
        <p
          className="text-sm text-center mt-2"
          style={{ color: textSecondaryColor }}
        >
          Verifying your identity...
        </p>
      )}
    </div>
  );
}
