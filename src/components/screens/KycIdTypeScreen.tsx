'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { StatusBar } from './shared/StatusBar';
import { X, CreditCard, Camera, User } from 'lucide-react';

interface KycIdTypeScreenProps {
  variant?: 'default' | 'alt';
}

export function KycIdTypeScreen({ variant = 'default' }: KycIdTypeScreenProps) {
  const { primaryColor, backgroundColor, textPrimaryColor, textSecondaryColor, texts } = useCustomizationStore();

  const steps = [
    {
      number: 1,
      icon: CreditCard,
      title: texts.idTypeStep1,
      desc: texts.idTypeStep1Desc,
    },
    {
      number: 2,
      icon: Camera,
      title: texts.idTypeStep2,
      desc: texts.idTypeStep2Desc,
    },
    {
      number: 3,
      icon: User,
      title: texts.idTypeStep3,
      desc: texts.idTypeStep3Desc,
    },
  ];

  return (
    <div className="mobile-screen flex flex-col" style={{ backgroundColor }}>
      <StatusBar />

      {/* Close button */}
      <div className="flex justify-end px-6 py-4">
        <button
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <X size={20} style={{ color: primaryColor }} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: textPrimaryColor }}
        >
          {texts.idTypeTitle}
        </h1>
        <p className="text-sm mb-8" style={{ color: textSecondaryColor }}>
          {texts.idTypeDesc}
        </p>

        <p className="text-sm font-medium mb-4" style={{ color: primaryColor }}>
          Here&apos;s what you gotta do
        </p>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100"
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: primaryColor }}
                >
                  {step.number}
                </span>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <Icon size={24} style={{ color: primaryColor }} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: textPrimaryColor }}>
                    {step.title}
                  </p>
                  <p className="text-sm" style={{ color: textSecondaryColor }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-10">
        <button
          className="w-full py-4 rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {texts.idTypeButton}
        </button>
      </div>
    </div>
  );
}
