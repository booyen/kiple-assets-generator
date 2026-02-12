'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { StatusBar } from './shared/StatusBar';
import { Fingerprint, ScanFace, KeyRound } from 'lucide-react';

export function AuthMethodScreen() {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, texts } = useCustomizationStore();

  const methods = [
    { icon: Fingerprint, label: 'Touch ID', desc: 'Use your fingerprint' },
    { icon: ScanFace, label: 'Face ID', desc: 'Use facial recognition' },
    { icon: KeyRound, label: 'PIN', desc: 'Use a 6-digit PIN' },
  ];

  return (
    <div className="mobile-screen flex flex-col" style={{ backgroundColor }}>
      <StatusBar />

      <div className="flex-1 px-6 pt-8">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: textPrimaryColor }}
        >
          {texts.chooseAuthTitle}
        </h1>
        <p className="text-sm mb-8" style={{ color: textSecondaryColor }}>
          Select your preferred authentication method for quick and secure access.
        </p>

        <div className="space-y-4">
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <Icon size={24} style={{ color: primaryColor }} />
                </div>
                <div className="text-left">
                  <p className="font-medium" style={{ color: textPrimaryColor }}>
                    {method.label}
                  </p>
                  <p className="text-sm" style={{ color: textSecondaryColor }}>
                    {method.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
