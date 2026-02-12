'use client';

import { useState } from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { TextInput } from './TextInput';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TextCustomizations } from '@/types';

interface TextSection {
  id: string;
  label: string;
  fields: { key: keyof TextCustomizations; label: string; multiline?: boolean }[];
}

const textSections: TextSection[] = [
  {
    id: 'login',
    label: 'Login Screen',
    fields: [
      { key: 'loginTitle', label: 'Title' },
      { key: 'loginSubtitle', label: 'Subtitle', multiline: true },
      { key: 'loginButton', label: 'Login Button' },
      { key: 'signupLink', label: 'Sign Up Link' },
      { key: 'forgotPassword', label: 'Forgot Password' },
      { key: 'dontHaveAccount', label: "Don't Have Account Text" },
    ],
  },
  {
    id: 'onboarding',
    label: 'Onboarding Screens',
    fields: [
      { key: 'onboarding1Title', label: 'Screen 1 Title' },
      { key: 'onboarding1Desc', label: 'Screen 1 Description', multiline: true },
      { key: 'onboarding2Title', label: 'Screen 2 Title' },
      { key: 'onboarding2Desc', label: 'Screen 2 Description', multiline: true },
      { key: 'onboarding3Title', label: 'Screen 3 Title' },
      { key: 'onboarding3Desc', label: 'Screen 3 Description', multiline: true },
      { key: 'onboarding4Title', label: 'Screen 4 Title' },
      { key: 'onboarding4Desc', label: 'Screen 4 Description', multiline: true },
      { key: 'onboarding5Title', label: 'Screen 5 Title' },
      { key: 'onboarding5Desc', label: 'Screen 5 Description', multiline: true },
    ],
  },
  {
    id: 'auth',
    label: 'Authentication',
    fields: [
      { key: 'touchIdTitle', label: 'Touch ID Title' },
      { key: 'touchIdDesc', label: 'Touch ID Description' },
      { key: 'faceIdTitle', label: 'Face ID Title' },
      { key: 'faceIdDesc', label: 'Face ID Description' },
      { key: 'chooseAuthTitle', label: 'Choose Auth Method Title' },
      { key: 'registrationSuccessTitle', label: 'Registration Success Title' },
      { key: 'registrationSuccessDesc', label: 'Registration Success Description', multiline: true },
      { key: 'registrationSuccessButton', label: 'Registration Success Button' },
    ],
  },
  {
    id: 'home',
    label: 'Home Screen',
    fields: [
      { key: 'walletBalanceLabel', label: 'Wallet Balance Label' },
      { key: 'seeAnalytics', label: 'See Analytics Text' },
      { key: 'transferLabel', label: 'Transfer Module' },
      { key: 'remittanceLabel', label: 'Remittance Module' },
      { key: 'visaLabel', label: 'Visa Module' },
      { key: 'payBillsLabel', label: 'Pay Bills Module' },
      { key: 'mobileReloadLabel', label: 'Mobile Reload Module' },
      { key: 'moreLabel', label: 'More Module' },
    ],
  },
  {
    id: 'ekyc',
    label: 'eKYC Screens',
    fields: [
      { key: 'kycLockTitle', label: 'KYC Lock Title' },
      { key: 'kycLockDesc', label: 'KYC Lock Description', multiline: true },
      { key: 'kycLockButton', label: 'KYC Lock Button' },
      { key: 'idTypeTitle', label: 'ID Type Title' },
      { key: 'idTypeDesc', label: 'ID Type Description', multiline: true },
      { key: 'idTypeStep1', label: 'Step 1 Title' },
      { key: 'idTypeStep1Desc', label: 'Step 1 Description' },
      { key: 'idTypeStep2', label: 'Step 2 Title' },
      { key: 'idTypeStep2Desc', label: 'Step 2 Description' },
      { key: 'idTypeStep3', label: 'Step 3 Title' },
      { key: 'idTypeStep3Desc', label: 'Step 3 Description' },
      { key: 'idTypeButton', label: 'ID Type Button' },
      { key: 'loadingText', label: 'Loading Text' },
    ],
  },
];

export function TextEditor() {
  const { texts, setText } = useCustomizationStore();
  const [expandedSections, setExpandedSections] = useState<string[]>(['login']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-2">
      {textSections.map((section) => {
        const isExpanded = expandedSections.includes(section.id);

        return (
          <div key={section.id} className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-sm font-medium text-slate-700">
                {section.label}
              </span>
              {isExpanded ? (
                <ChevronDown size={16} className="text-slate-500" />
              ) : (
                <ChevronRight size={16} className="text-slate-500" />
              )}
            </button>

            {isExpanded && (
              <div className="p-3 space-y-3 bg-white">
                {section.fields.map((field) => (
                  <TextInput
                    key={field.key}
                    label={field.label}
                    value={texts[field.key]}
                    onChange={(v) => setText(field.key, v)}
                    multiline={field.multiline}
                    rows={2}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
