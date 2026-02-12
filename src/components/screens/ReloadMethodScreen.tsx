'use client';

import React from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, Check, Copy, Info } from 'lucide-react';

interface ReloadMethodScreenProps {
  variant?: 'default' | 'saved-card' | 'online-banking' | 'credit-card';
}

export function ReloadMethodScreen({ variant = 'default' }: ReloadMethodScreenProps) {
  const {
    primaryColor,
    textPrimaryColor,
    textSecondaryColor,
    currencySymbol,
  } = useCustomizationStore();

  const typography = useTypography();

  const reloadAmount = '100';
  const selectedMethod = variant === 'default' ? null : variant;

  const PaymentOption = ({
    icon,
    title,
    subtitle,
    isSelected,
    showCopy,
    isFirst,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    isSelected: boolean;
    showCopy?: boolean;
    isFirst?: boolean;
  }) => (
    <div
      className={`bg-white rounded-xl p-4 flex items-center gap-3 ${
        isSelected ? 'border-2' : 'border border-slate-200'
      }`}
      style={{
        borderColor: isSelected ? primaryColor : undefined,
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

  return (
    <div className="mobile-screen flex flex-col bg-slate-50">
      <StatusBar />

      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <button className="p-1">
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
          Choose reload method
        </h2>

        {/* Saved Options */}
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
            SAVED OPTIONS
          </div>

          <PaymentOption
            icon={
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 bg-blue-600 rounded-sm" />
                <div className="w-6 h-4 bg-orange-500 rounded-sm -ml-2" />
              </div>
            }
            title="Pay with Your Saved card"
            subtitle={variant === 'saved-card' ? 'VISA ending in 8908' : undefined}
            isSelected={selectedMethod === 'saved-card'}
          />
        </div>

        {/* Other Options */}
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
            OTHER OPTIONS
          </div>

          <div className="space-y-3">
            <PaymentOption
              icon={
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <span style={{ ...typography.body, fontWeight: 700 }}>
                    FPX
                  </span>
                </div>
              }
              title={variant === 'saved-card' ? 'Pay using Online Banking' : 'Pay with Online Banking'}
              isSelected={selectedMethod === 'online-banking'}
            />

            <PaymentOption
              icon={
                <div className="flex items-center gap-1">
                  <div className="w-6 h-4 bg-blue-600 rounded-sm" />
                  <div className="w-6 h-4 bg-orange-500 rounded-sm -ml-2" />
                </div>
              }
              title="Pay with Credit/Debit card"
              isSelected={selectedMethod === 'credit-card'}
            />

            <PaymentOption
              icon={
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-pink-600 font-bold"
                    style={{ backgroundColor: '#EC4899' }}
                  >
                    <span className="text-white text-lg">D</span>
                  </div>
                </div>
              }
              title="DuitNow Transfer"
              subtitle="Acc No: 1234567890012"
              isSelected={false}
              showCopy
            />

            <PaymentOption
              icon={
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-4 border-2 border-slate-400 rounded-sm" />
                </div>
              }
              title="Virtual Bank"
              subtitle="AFIN BANK · 0129324679"
              isSelected={false}
              showCopy
            />

            <PaymentOption
              icon={
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <div className="flex flex-col">
                    <div className="w-6 h-1 bg-orange-500 rounded" />
                    <div className="w-6 h-1 bg-green-500 rounded mt-0.5" />
                    <div className="w-6 h-1 bg-red-500 rounded mt-0.5" />
                  </div>
                </div>
              }
              title="7-Eleven (OTC)"
              isSelected={false}
            />
          </div>
        </div>

        {/* Info Note */}
        {variant === 'saved-card' && (
          <div className="mt-6 p-3 bg-slate-50 rounded-lg">
            <p
              style={{
                ...typography.caption,
                fontSize: '11px',
                color: textSecondaryColor,
                lineHeight: 1.5,
              }}
            >
              An extra RM1.00 will be charged based on your selected card type and
              provider charge.
            </p>
          </div>
        )}
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
          Reload Wallet - {currencySymbol}
          {variant === 'saved-card' ? '101' : reloadAmount}
        </button>
      </div>
    </div>
  );
}
