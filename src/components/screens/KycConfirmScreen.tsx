'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { StatusBar } from './shared/StatusBar';
import { ChevronLeft, ChevronDown } from 'lucide-react';

export function KycConfirmScreen() {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor } = useCustomizationStore();

  const fields = [
    { label: 'Full Name', value: 'Ahmad bin Abdullah' },
    { label: 'ID Number', value: '901234-56-7890' },
    { label: 'Date of Birth', value: '15 March 1990' },
    { label: 'Gender', value: 'Male' },
    { label: 'Address', value: '123 Jalan Example, 50000 Kuala Lumpur' },
  ];

  return (
    <div className="mobile-screen flex flex-col" style={{ backgroundColor }}>
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <ChevronLeft size={20} style={{ color: primaryColor }} />
        </button>
        <h1 className="text-lg font-semibold" style={{ color: textPrimaryColor }}>
          Confirm ID Details
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <p className="text-sm mb-6" style={{ color: textSecondaryColor }}>
          Please verify that the information below is correct before proceeding.
        </p>

        {/* ID Preview */}
        <div
          className="h-40 rounded-xl mb-6 flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <div className="text-center">
            <div
              className="w-20 h-14 rounded-lg mx-auto mb-2"
              style={{ backgroundColor: `${primaryColor}20` }}
            />
            <p className="text-xs" style={{ color: textSecondaryColor }}>
              ID Card Preview
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl border border-slate-100"
            >
              <p className="text-xs mb-1" style={{ color: textSecondaryColor }}>
                {field.label}
              </p>
              <p className="font-medium" style={{ color: textPrimaryColor }}>
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-10 space-y-3">
        <button
          className="w-full py-4 rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          Confirm & Continue
        </button>
        <button
          className="w-full py-4 rounded-full text-base font-semibold border"
          style={{ color: primaryColor, borderColor: primaryColor }}
        >
          Retake Photo
        </button>
      </div>
    </div>
  );
}
