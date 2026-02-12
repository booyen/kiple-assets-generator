'use client';

import React from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { X, Delete } from 'lucide-react';

interface ReloadAmountModalProps {
  selectedAmount?: string;
}

export function ReloadAmountModal({ selectedAmount = '100.00' }: ReloadAmountModalProps) {
  const {
    primaryColor,
    textPrimaryColor,
    textSecondaryColor,
    currencySymbol,
    balanceAmount,
  } = useCustomizationStore();

  const typography = useTypography();

  const quickAmounts = ['20', '50', '100', '150'];
  const selectedQuick = selectedAmount === '150.00' ? '150' : null;

  const NumberButton = ({ number }: { number: string | number }) => (
    <button
      className="h-16 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors"
      style={{
        ...typography.h2,
        fontSize: '28px',
        color: textPrimaryColor,
      }}
    >
      {number}
    </button>
  );

  return (
    <div className="mobile-screen flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <button className="mb-4">
          <X size={24} style={{ color: textPrimaryColor }} />
        </button>

        <h2
          style={{
            ...typography.h2,
            fontSize: '20px',
            fontWeight: 600,
            color: textPrimaryColor,
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          Enter amount
        </h2>

        {/* Amount Display */}
        <div className="text-center mb-2">
          <span
            style={{
              ...typography.h1,
              fontSize: '36px',
              fontWeight: 600,
              color: textPrimaryColor,
            }}
          >
            {currencySymbol}
          </span>
          <span
            style={{
              ...typography.h1,
              fontSize: '36px',
              fontWeight: 600,
              color: primaryColor,
            }}
          >
            {selectedAmount}
          </span>
        </div>

        {/* Wallet Balance */}
        <div
          style={{
            ...typography.small,
            fontSize: '13px',
            color: textSecondaryColor,
            textAlign: 'center',
          }}
        >
          Wallet Balance : {currencySymbol} {balanceAmount}
        </div>
      </div>

      {/* Quick Amount Chips */}
      <div className="px-6 mb-6">
        <div className="flex gap-3">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              className="flex-1 py-3 rounded-xl border font-medium transition-colors"
              style={{
                backgroundColor: selectedQuick === amount ? primaryColor : 'white',
                borderColor: selectedQuick === amount ? primaryColor : '#E2E8F0',
                color: selectedQuick === amount ? 'white' : textPrimaryColor,
                ...typography.body,
                fontSize: '14px',
              }}
            >
              {currencySymbol}{amount}
            </button>
          ))}
        </div>
      </div>

      {/* Number Pad */}
      <div className="flex-1 px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <NumberButton number={1} />
          <NumberButton number={2} />
          <div
            className="h-16 flex items-center justify-center rounded-xl"
            style={{ backgroundColor: '#EFF6FF' }}
          >
            <span
              style={{
                ...typography.h2,
                fontSize: '28px',
                color: primaryColor,
                fontWeight: 400,
              }}
            >
              3
            </span>
          </div>

          <NumberButton number={4} />
          <NumberButton number={5} />
          <NumberButton number={6} />

          <NumberButton number={7} />
          <NumberButton number={8} />
          <NumberButton number={9} />

          <div></div>
          <NumberButton number={0} />
          <button className="h-16 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors">
            <Delete size={24} style={{ color: textPrimaryColor }} />
          </button>
        </div>

        {/* Add Money Button */}
        <button
          className="w-full py-4 rounded-xl text-white font-semibold"
          style={{
            backgroundColor: primaryColor,
            ...typography.button,
            fontSize: '16px',
          }}
        >
          Add Money
        </button>
      </div>
    </div>
  );
}
