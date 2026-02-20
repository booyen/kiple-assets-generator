'use client';

import React from 'react';
import { useCustomizationStore, defaultTexts } from '@/store/useCustomizationStore';
import { useTypography, type TypographyStyles } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ReloadMethodKey } from '@/types';

interface AmountSectionProps {
  title: string;
  selectedAmount: string;
  quickAmounts: string[];
  currencySymbol: string;
  primaryColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  typography: TypographyStyles;
}

function AmountSection({
  title,
  selectedAmount,
  quickAmounts,
  currencySymbol,
  primaryColor,
  textPrimaryColor,
  textSecondaryColor,
  typography,
}: AmountSectionProps) {
  return (
    <div className="mb-6">
      <label
        style={{
          ...typography.body,
          fontSize: '14px',
          color: textPrimaryColor,
          display: 'block',
          marginBottom: '8px',
        }}
      >
        {title}
      </label>

      {/* Input Field */}
      <div className="mb-3">
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
          <div
            style={{
              ...typography.caption,
              fontSize: '11px',
              color: textSecondaryColor,
              marginBottom: '2px',
            }}
          >
            Enter Amount
          </div>
          <div
            style={{
              ...typography.body,
              fontSize: '16px',
              fontWeight: 500,
              color: textPrimaryColor,
            }}
          >
            {currencySymbol} 100.00
          </div>
        </div>
      </div>

      {/* OR */}
      <div
        style={{
          ...typography.caption,
          fontSize: '11px',
          color: textSecondaryColor,
          marginBottom: '8px',
        }}
      >
        OR
      </div>

      {/* Quick Amount Chips */}
      <div className="flex gap-3">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            className="flex-1 py-3 rounded-xl border font-medium transition-colors"
            style={{
              backgroundColor:
                selectedAmount === amount ? 'white' : 'white',
              borderColor:
                selectedAmount === amount ? primaryColor : '#E2E8F0',
              color:
                selectedAmount === amount ? primaryColor : textPrimaryColor,
              ...typography.body,
              fontSize: '14px',
              borderWidth: selectedAmount === amount ? '2px' : '1px',
            }}
          >
            {currencySymbol}{amount}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AutoReloadScreen() {
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

  const quickAmounts = ['20', '50', '100'];
  const selectedTopUpAmount = '20';
  const selectedAutoAmount = '20';
  const methodOrder: ReloadMethodKey[] = ['savedCard', 'creditCard', 'onlineBanking', 'duitNow', 'virtualBank', 'sevenEleven'];
  const selectedMethod = methodOrder.find((method) => reloadMethods[method].enabled) || 'savedCard';

  const methodTitleMap: Record<ReloadMethodKey, string> = {
    savedCard: withDefault(texts.reloadSavedCardTitle, 'reloadSavedCardTitle'),
    creditCard: withDefault(texts.reloadCreditCardTitle, 'reloadCreditCardTitle'),
    onlineBanking: withDefault(texts.reloadOnlineBankingTitle, 'reloadOnlineBankingTitle'),
    duitNow: withDefault(texts.reloadDuitNowTitle, 'reloadDuitNowTitle'),
    virtualBank: withDefault(texts.reloadVirtualBankTitle, 'reloadVirtualBankTitle'),
    sevenEleven: withDefault(texts.reloadSevenElevenTitle, 'reloadSevenElevenTitle'),
  };

  const methodSubtitleMap: Record<ReloadMethodKey, string> = {
    savedCard: withDefault(texts.reloadSavedCardSubtitle, 'reloadSavedCardSubtitle'),
    creditCard: withDefault(texts.reloadSavedCardSubtitle, 'reloadSavedCardSubtitle'),
    onlineBanking: '',
    duitNow: withDefault(texts.reloadDuitNowSubtitle, 'reloadDuitNowSubtitle'),
    virtualBank: withDefault(texts.reloadVirtualBankSubtitle, 'reloadVirtualBankSubtitle'),
    sevenEleven: '',
  };

  return (
    <div className="mobile-screen flex flex-col bg-slate-50">
      <StatusBar />

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b border-slate-100">
        <button className="p-1 mr-3" onClick={() => setCurrentScreen('reload-method')}>
          <ArrowLeft size={24} style={{ color: textPrimaryColor }} />
        </button>
        <h1
          style={{
            ...typography.h2,
            fontSize: '18px',
            fontWeight: 600,
            color: primaryColor,
          }}
        >
          Auto-Reload
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <AmountSection
          title="Auto top-up when balance below"
          selectedAmount={selectedTopUpAmount}
          quickAmounts={quickAmounts}
          currencySymbol={currencySymbol}
          primaryColor={primaryColor}
          textPrimaryColor={textPrimaryColor}
          textSecondaryColor={textSecondaryColor}
          typography={typography}
        />

        <AmountSection
          title="Amount to top-up"
          selectedAmount={selectedAutoAmount}
          quickAmounts={quickAmounts}
          currencySymbol={currencySymbol}
          primaryColor={primaryColor}
          textPrimaryColor={textPrimaryColor}
          textSecondaryColor={textSecondaryColor}
          typography={typography}
        />

        {/* Auto Reload With */}
        <div className="mb-6">
          <label
            style={{
              ...typography.body,
              fontSize: '14px',
              color: textPrimaryColor,
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Auto Reload With
          </label>

          <button className="w-full bg-white border-2 rounded-xl px-4 py-4 flex items-center gap-3"
            style={{ borderColor: primaryColor }}
          >
            {reloadMethods[selectedMethod].logo ? (
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={reloadMethods[selectedMethod].logo || ''} alt="Reload method logo" className="w-full h-full object-contain p-1" />
              </div>
            ) : (
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-6 h-4 bg-blue-600 rounded-sm" />
                <div className="w-6 h-4 bg-orange-500 rounded-sm -ml-2" />
              </div>
            )}
            <div className="flex-1 text-left">
              <div
                style={{
                  ...typography.body,
                  fontSize: '14px',
                  color: textPrimaryColor,
                }}
              >
                {methodTitleMap[selectedMethod]}
              </div>
              {methodSubtitleMap[selectedMethod] && (
                <div
                  style={{
                    ...typography.small,
                    fontSize: '12px',
                    color: textSecondaryColor,
                    marginTop: '2px',
                  }}
                >
                  {methodSubtitleMap[selectedMethod]}
                </div>
              )}
            </div>
            <ChevronRight size={20} style={{ color: textSecondaryColor }} />
          </button>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-100">
        <button
          onClick={() => setCurrentScreen('reload-success')}
          className="w-full py-4 rounded-xl text-white font-semibold"
          style={{
            backgroundColor: primaryColor,
            ...typography.button,
            fontSize: '16px',
          }}
        >
          Save Auto Reload
        </button>
      </div>
    </div>
  );
}
