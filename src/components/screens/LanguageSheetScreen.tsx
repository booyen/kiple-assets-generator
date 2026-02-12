'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { StatusBar } from './shared/StatusBar';
import { Check } from 'lucide-react';

export function LanguageSheetScreen() {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor } = useCustomizationStore();

  const languages = [
    { code: 'en', name: 'English (UK)', flag: '🇬🇧', selected: true },
    { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾', selected: false },
    { code: 'zh', name: '中文 (简体)', flag: '🇨🇳', selected: false },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', selected: false },
  ];

  return (
    <div className="mobile-screen flex flex-col" style={{ backgroundColor }}>
      <StatusBar />

      {/* Dimmed overlay effect */}
      <div className="flex-1 bg-black/20" />

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-3xl p-6">
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-6" />

        <h2
          className="text-xl font-bold mb-6"
          style={{ color: textPrimaryColor }}
        >
          Select Language
        </h2>

        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                lang.selected ? 'bg-slate-100' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <span
                  className="font-medium"
                  style={{ color: textPrimaryColor }}
                >
                  {lang.name}
                </span>
              </div>
              {lang.selected && (
                <Check size={20} style={{ color: primaryColor }} />
              )}
            </button>
          ))}
        </div>

        <button
          className="w-full py-4 mt-6 rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
