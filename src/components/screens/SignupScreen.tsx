'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ChevronLeft, Eye } from 'lucide-react';

export function SignupScreen() {
  const {
    primaryColor,
    backgroundColor,
    textPrimaryColor,
    textSecondaryColor,
    setCurrentScreen,
  } = useCustomizationStore();

  const typography = useTypography();

  return (
    <div className="mobile-screen flex flex-col" style={{ backgroundColor, fontFamily: typography.fontFamily }}>
      <StatusBar />

      <div className="flex items-center gap-3 px-6 py-3">
        <button
          onClick={() => setCurrentScreen('login')}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <ChevronLeft size={20} style={{ color: primaryColor }} />
        </button>
        <h1 style={{ ...typography.h3, color: textPrimaryColor }}>Create Account</h1>
      </div>

      <div className="flex-1 px-6 pt-4">
        <p style={{ ...typography.small, color: textSecondaryColor }} className="mb-6">
          Set up your account to start using kiple services.
        </p>

        <div className="space-y-3">
          <div className="border border-slate-200 rounded-xl p-4">
            <p style={{ ...typography.caption, color: textSecondaryColor }}>Full Name</p>
            <p style={{ ...typography.body, color: textPrimaryColor }}>Ahmad bin Abdullah</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-4">
            <p style={{ ...typography.caption, color: textSecondaryColor }}>Mobile Number</p>
            <p style={{ ...typography.body, color: textPrimaryColor }}>+60 12345 6978</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-4">
            <p style={{ ...typography.caption, color: textSecondaryColor }}>Email (Optional)</p>
            <p style={{ ...typography.body, color: textPrimaryColor }}>ahmad@mail.com</p>
          </div>
          <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p style={{ ...typography.caption, color: textSecondaryColor }}>Password</p>
              <p style={{ ...typography.body, color: textPrimaryColor }}>••••••••</p>
            </div>
            <Eye size={18} style={{ color: textSecondaryColor }} />
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={() => setCurrentScreen('registration-success')}
          className="w-full py-4 rounded-full text-white"
          style={{ ...typography.button, backgroundColor: primaryColor }}
        >
          Continue
        </button>
        <button
          onClick={() => setCurrentScreen('login')}
          className="w-full py-3 rounded-full border"
          style={{ ...typography.small, color: primaryColor, borderColor: primaryColor, fontWeight: 600 }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
