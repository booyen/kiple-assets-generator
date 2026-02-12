'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { Logo } from './shared/Logo';
import { ChevronDown } from 'lucide-react';

interface LoginScreenProps {
  variant?: 'default' | 'phone-focus' | 'password-focus';
}

export function LoginScreen({ variant = 'default' }: LoginScreenProps) {
  const {
    logo,
    appName,
    primaryColor,
    backgroundColor,
    textPrimaryColor,
    textSecondaryColor,
    texts,
  } = useCustomizationStore();

  const typography = useTypography();

  const isPhoneFocused = variant === 'phone-focus';
  const isPasswordFocused = variant === 'password-focus';

  return (
    <div
      className="mobile-screen flex flex-col"
      style={{ backgroundColor, fontFamily: typography.fontFamily }}
    >
      <StatusBar />

      {/* Language selector */}
      <div className="flex justify-end px-6 py-2">
        <button
          className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-full"
          style={typography.small}
        >
          <span>English (UK)</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        {/* Logo */}
        <div className="mb-8">
          <Logo
            logo={logo}
            appName={appName}
            primaryColor={primaryColor}
            size="md"
          />
        </div>

        {/* Title */}
        <h1 style={{ ...typography.h2, color: textPrimaryColor }} className="mb-2">
          {texts.loginTitle}
        </h1>
        <p style={{ ...typography.small, color: textSecondaryColor }} className="mb-8">
          {texts.loginSubtitle}
        </p>

        {/* Phone input */}
        <div
          className={`flex items-center border rounded-xl p-4 mb-4 ${
            isPhoneFocused ? 'border-2' : 'border-slate-200'
          }`}
          style={isPhoneFocused ? { borderColor: primaryColor } : {}}
        >
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <div className="w-6 h-4 bg-gradient-to-b from-red-500 via-white to-blue-900 rounded-sm" />
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          <div className="flex-1 pl-3">
            <p style={{ ...typography.caption, color: primaryColor }}>
              Mobile Number
            </p>
            <p style={{ ...typography.body, color: textPrimaryColor }}>
              +60 12345 6978
            </p>
          </div>
        </div>

        {/* Password input */}
        <div
          className={`border rounded-xl p-4 mb-2 ${
            isPasswordFocused ? 'border-2' : 'border-slate-200'
          }`}
          style={isPasswordFocused ? { borderColor: primaryColor } : {}}
        >
          <p style={{ ...typography.small, color: textSecondaryColor }}>
            Password
          </p>
        </div>

        {/* Forgot password */}
        <div className="text-right mb-8">
          <button style={{ ...typography.small, color: primaryColor, fontWeight: 500 }}>
            {texts.forgotPassword}
          </button>
        </div>

        {/* Login button */}
        <button
          className="w-full py-4 rounded-full text-white"
          style={{ ...typography.button, backgroundColor: primaryColor }}
        >
          {texts.loginButton}
        </button>

        {/* Sign up link */}
        <p className="text-center mt-6" style={{ ...typography.small, color: textSecondaryColor }}>
          {texts.dontHaveAccount}{' '}
          <span style={{ fontWeight: 600, color: primaryColor }}>
            {texts.signupLink}
          </span>
        </p>
      </div>

      {/* Version */}
      <p className="text-center pb-6" style={{ ...typography.caption, color: textSecondaryColor }}>
        Version - alpha0.0.1
      </p>
    </div>
  );
}
