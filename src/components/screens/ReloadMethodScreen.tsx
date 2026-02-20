'use client';

import React from 'react';
import { useCustomizationStore, defaultTexts } from '@/store/useCustomizationStore';
import { useTypography, type TypographyStyles } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { ReloadMethodKey } from '@/types';

interface ReloadMethodScreenProps {
  variant?: 'default' | 'saved-card' | 'online-banking' | 'credit-card';
}

interface PaymentOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  isSelected: boolean;
  showCopy?: boolean;
  primaryColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  typography: TypographyStyles;
  onSelect?: () => void;
}

function PaymentOption({
  icon,
  title,
  subtitle,
  isSelected,
  showCopy,
  primaryColor,
  textPrimaryColor,
  textSecondaryColor,
  typography,
  onSelect,
}: PaymentOptionProps) {
  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-xl p-4 flex items-center gap-3 ${
        isSelected ? 'border-2' : 'border border-slate-200'
      }`}
      style={{
        borderColor: isSelected ? primaryColor : undefined,
        cursor: onSelect ? 'pointer' : 'default',
      }}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <div style={{ ...typography.body, color: textPrimaryColor }}>
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              ...typography.small,
              fontSize: '12px',
              color: textSecondaryColor,
              marginTop: '2px',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
      {showCopy && (
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg"
          style={{ color: primaryColor }}
        >
          <Copy size={14} />
          <span style={{ ...typography.small }}>Copy</span>
        </button>
      )}
      {isSelected && (
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#10B981' }}
        >
          <Check size={16} className="text-white" />
        </div>
      )}
    </div>
  );
}

function MethodIcon({
  method,
  logo,
  typography,
}: {
  method: ReloadMethodKey;
  logo: string | null;
  typography: TypographyStyles;
}) {
  if (logo) {
    return (
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={`${method} logo`} className="w-full h-full object-contain p-1" />
      </div>
    );
  }

  if (method === 'savedCard' || method === 'creditCard') {
    return (
      <div className="flex items-center gap-1">
        <div className="w-6 h-4 bg-blue-600 rounded-sm" />
        <div className="w-6 h-4 bg-orange-500 rounded-sm -ml-2" />
      </div>
    );
  }

  if (method === 'onlineBanking') {
    return (
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
        <span style={{ ...typography.body, fontWeight: 700 }}>FPX</span>
      </div>
    );
  }

  if (method === 'duitNow') {
    return (
      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-pink-600 font-bold"
          style={{ backgroundColor: '#EC4899' }}
        >
          <span className="text-white text-lg">D</span>
        </div>
      </div>
    );
  }

  if (method === 'virtualBank') {
    return (
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
        <div className="w-6 h-4 border-2 border-slate-400 rounded-sm" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
      <div className="flex flex-col">
        <div className="w-6 h-1 bg-orange-500 rounded" />
        <div className="w-6 h-1 bg-green-500 rounded mt-0.5" />
        <div className="w-6 h-1 bg-red-500 rounded mt-0.5" />
      </div>
    </div>
  );
}

export function ReloadMethodScreen({ variant = 'default' }: ReloadMethodScreenProps) {
  const {
    primaryColor,
    textPrimaryColor,
    textSecondaryColor,
    currencySymbol,
    texts,
    reloadMethods,
    setCurrentScreen,
  } = useCustomizationStore();

  const typography = useTypography();
  const withDefault = (value: string | undefined, key: keyof typeof defaultTexts): string => {
    const normalized = typeof value === 'string' ? value.trim() : '';
    return normalized ? value as string : defaultTexts[key];
  };

  const reloadAmount = '100';
  const variantMap: Record<NonNullable<ReloadMethodScreenProps['variant']>, ReloadMethodKey | null> = {
    default: null,
    'saved-card': 'savedCard',
    'online-banking': 'onlineBanking',
    'credit-card': 'creditCard',
  };
  const variantMethod = variantMap[variant];
  const selectedMethod = variantMethod && reloadMethods[variantMethod].enabled ? variantMethod : null;
  const methodScreenMap: Record<ReloadMethodKey, string> = {
    savedCard: 'reload-method-saved',
    onlineBanking: 'reload-method-banking',
    creditCard: 'reload-method-card',
    duitNow: 'reload-method',
    virtualBank: 'auto-reload',
    sevenEleven: 'reload-method',
  };

  const allOptions: {
    key: ReloadMethodKey;
    title: string;
    subtitle?: string;
    showCopy?: boolean;
    section: 'saved' | 'other';
  }[] = [
    {
      key: 'savedCard',
      title: withDefault(texts.reloadSavedCardTitle, 'reloadSavedCardTitle'),
      subtitle: withDefault(texts.reloadSavedCardSubtitle, 'reloadSavedCardSubtitle'),
      section: 'saved',
    },
    {
      key: 'onlineBanking',
      title: withDefault(texts.reloadOnlineBankingTitle, 'reloadOnlineBankingTitle'),
      section: 'other',
    },
    {
      key: 'creditCard',
      title: withDefault(texts.reloadCreditCardTitle, 'reloadCreditCardTitle'),
      section: 'other',
    },
    {
      key: 'duitNow',
      title: withDefault(texts.reloadDuitNowTitle, 'reloadDuitNowTitle'),
      subtitle: withDefault(texts.reloadDuitNowSubtitle, 'reloadDuitNowSubtitle'),
      showCopy: true,
      section: 'other',
    },
    {
      key: 'virtualBank',
      title: withDefault(texts.reloadVirtualBankTitle, 'reloadVirtualBankTitle'),
      subtitle: withDefault(texts.reloadVirtualBankSubtitle, 'reloadVirtualBankSubtitle'),
      showCopy: true,
      section: 'other',
    },
    {
      key: 'sevenEleven',
      title: withDefault(texts.reloadSevenElevenTitle, 'reloadSevenElevenTitle'),
      section: 'other',
    },
  ];

  const enabledOptions = allOptions.filter((opt) => reloadMethods[opt.key].enabled);
  const savedOptions = enabledOptions.filter((opt) => opt.section === 'saved');
  const otherOptions = enabledOptions.filter((opt) => opt.section === 'other');

  return (
    <div className="mobile-screen flex flex-col bg-slate-50">
      <StatusBar />

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <button className="p-1" onClick={() => setCurrentScreen('home')}>
          <ArrowLeft size={24} style={{ color: textPrimaryColor }} />
        </button>
        <div className="text-right">
          <div
            style={{
              ...typography.caption,
              fontSize: '12px',
              color: textSecondaryColor,
            }}
          >
            Amount to reload
          </div>
          <div
            style={{
              ...typography.h3,
              fontSize: '18px',
              fontWeight: 600,
              color: primaryColor,
            }}
          >
            {currencySymbol}{reloadAmount}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <h2
          style={{
            ...typography.h3,
            fontSize: '18px',
            fontWeight: 600,
            color: textPrimaryColor,
            marginBottom: '16px',
          }}
        >
          {withDefault(texts.reloadSelectTitle, 'reloadSelectTitle')}
        </h2>

        {enabledOptions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center bg-white">
            <p style={{ ...typography.small, color: textSecondaryColor }}>
              No reload method is enabled. Turn on methods in the Modules tab.
            </p>
          </div>
        ) : (
          <>
            {savedOptions.length > 0 && (
              <div className="mb-6">
                <div
                  style={{
                    ...typography.caption,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: textSecondaryColor,
                    letterSpacing: '0.5px',
                    marginBottom: '12px',
                  }}
                >
                  {withDefault(texts.reloadSavedOptionsLabel, 'reloadSavedOptionsLabel')}
                </div>

                <div className="space-y-3">
                  {savedOptions.map((option) => (
                    <PaymentOption
                      key={option.key}
                      icon={
                        <MethodIcon
                          method={option.key}
                          logo={reloadMethods[option.key].logo}
                          typography={typography}
                        />
                      }
                      title={option.title}
                      subtitle={option.subtitle}
                      isSelected={selectedMethod === option.key}
                      showCopy={option.showCopy}
                      primaryColor={primaryColor}
                      textPrimaryColor={textPrimaryColor}
                      textSecondaryColor={textSecondaryColor}
                      typography={typography}
                      onSelect={() => setCurrentScreen(methodScreenMap[option.key])}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherOptions.length > 0 && (
              <div>
                <div
                  style={{
                    ...typography.caption,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: textSecondaryColor,
                    letterSpacing: '0.5px',
                    marginBottom: '12px',
                  }}
                >
                  {withDefault(texts.reloadOtherOptionsLabel, 'reloadOtherOptionsLabel')}
                </div>

                <div className="space-y-3">
                  {otherOptions.map((option) => (
                    <PaymentOption
                      key={option.key}
                      icon={
                        <MethodIcon
                          method={option.key}
                          logo={reloadMethods[option.key].logo}
                          typography={typography}
                        />
                      }
                      title={option.title}
                      subtitle={option.subtitle}
                      isSelected={selectedMethod === option.key}
                      showCopy={option.showCopy}
                      primaryColor={primaryColor}
                      textPrimaryColor={textPrimaryColor}
                      textSecondaryColor={textSecondaryColor}
                      typography={typography}
                      onSelect={() => setCurrentScreen(methodScreenMap[option.key])}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Info Note */}
        {selectedMethod === 'savedCard' && (
          <div className="mt-6 p-3 bg-slate-50 rounded-lg">
            <p
              style={{
                ...typography.caption,
                fontSize: '11px',
                color: textSecondaryColor,
                lineHeight: 1.5,
              }}
            >
              {withDefault(texts.reloadInfoNote, 'reloadInfoNote')}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-100">
        <button
          onClick={() => setCurrentScreen(selectedMethod === 'virtualBank' ? 'auto-reload' : 'reload-amount')}
          className="w-full py-4 rounded-xl text-white font-semibold"
          style={{
            backgroundColor: primaryColor,
            ...typography.button,
            fontSize: '16px',
          }}
        >
          Reload Wallet - {currencySymbol}
          {variant === 'saved-card' ? '101' : reloadAmount}
        </button>
      </div>
    </div>
  );
}
