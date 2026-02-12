'use client';

import React from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export function AutoReloadScreen() {
  const {
    primaryColor,
    textPrimaryColor,
    textSecondaryColor,
    currencySymbol,
  } = useCustomizationStore();

  const typography = useTypography();

  const quickAmounts = ['20', '50', '100'];
  const selectedTopUpAmount = '20';
  const selectedAutoAmount = '20';

  const AmountSection = ({
    title,
    selectedAmount,
  }: {
    title: string;
    selectedAmount: string;
  }) => (
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

  return (
    <div className="mobile-screen flex flex-col bg-slate-50">
      <StatusBar />

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center border-b border-slate-100">
        <button className="p-1 mr-3">
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
        />

        <AmountSection
          title="Amount to top-up"
          selectedAmount={selectedAutoAmount}
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
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-6 h-4 bg-blue-600 rounded-sm" />
              <div className="w-6 h-4 bg-orange-500 rounded-sm -ml-2" />
            </div>
            <div className="flex-1 text-left">
              <div
                style={{
                  ...typography.body,
                  fontSize: '14px',
                  color: textPrimaryColor,
                }}
              >
                Pay with Credit/Debit card
              </div>
              <div
                style={{
                  ...typography.small,
                  fontSize: '12px',
                  color: textSecondaryColor,
                  marginTop: '2px',
                }}
              >
                VISA ending in 8908
              </div>
            </div>
            <ChevronRight size={20} style={{ color: textSecondaryColor }} />
          </button>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-6 py-4 bg-white border-t border-slate-100">
        <button
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
