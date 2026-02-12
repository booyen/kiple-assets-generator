'use client';

import React from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { Check, X as XIcon, Share2 } from 'lucide-react';

interface ReloadReceiptScreenProps {
  variant: 'success' | 'failed';
}

export function ReloadReceiptScreen({ variant }: ReloadReceiptScreenProps) {
  const {
    primaryColor,
    textPrimaryColor,
    textSecondaryColor,
    currencySymbol,
  } = useCustomizationStore();

  const typography = useTypography();

  const isSuccess = variant === 'success';
  const statusColor = isSuccess ? '#10B981' : '#EF4444';
  const statusBgColor = isSuccess ? '#D1FAE5' : '#FEE2E2';

  const ReceiptRow = ({
    label,
    value,
    valueColor,
  }: {
    label: string;
    value: string;
    valueColor?: string;
  }) => (
    <div className="flex justify-between items-center py-3">
      <span
        style={{
          ...typography.body,
          fontSize: '13px',
          color: textSecondaryColor,
        }}
      >
        {label}
      </span>
      <span
        style={{
          ...typography.body,
          fontSize: '13px',
          fontWeight: 500,
          color: valueColor || textPrimaryColor,
        }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <div className="mobile-screen flex flex-col bg-white">
      <div className="flex-1 overflow-auto px-6 pt-12 pb-6">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: statusBgColor }}
          >
            {isSuccess ? (
              <Check size={40} style={{ color: statusColor }} strokeWidth={3} />
            ) : (
              <XIcon size={40} style={{ color: statusColor }} strokeWidth={3} />
            )}
          </div>
        </div>

        {/* Status Title */}
        <h2
          style={{
            ...typography.h2,
            fontSize: '22px',
            fontWeight: 600,
            color: textPrimaryColor,
            textAlign: 'center',
            marginBottom: '8px',
          }}
        >
          Reload {isSuccess ? 'Success' : 'Failed'}!
        </h2>

        {/* Amount */}
        <div
          style={{
            ...typography.h1,
            fontSize: '28px',
            fontWeight: 700,
            color: textPrimaryColor,
            textAlign: 'center',
            marginBottom: '4px',
          }}
        >
          {currencySymbol}100.00
        </div>

        {/* Status Message or Error */}
        <div
          style={{
            ...typography.small,
            fontSize: '13px',
            color: isSuccess ? textSecondaryColor : '#EF4444',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          {isSuccess ? 'Has been added to your wallet' : 'ERROR CODE : 89809809'}
        </div>

        {/* Receipt Details */}
        <div className="border-t border-slate-200">
          <ReceiptRow label="Ref Number" value="XCXC7890000-09" />
          <ReceiptRow label="Transaction Date & Time" value="29-09-2024, 16:38:12" />
          <ReceiptRow label="Transaction Method" value="FPX" />
          <ReceiptRow label="Bank Name" value="Maybank" />
        </div>

        {/* Amount Breakdown */}
        <div className="border-t border-slate-200 mt-4">
          <ReceiptRow label="Amount" value={`${currencySymbol}100.00`} />
          <ReceiptRow label="Fee" value={`${currencySymbol}0.00`} />
          <ReceiptRow
            label="Total"
            value={`${currencySymbol}100.00`}
            valueColor={primaryColor}
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-6 space-y-3">
        {/* Secondary Button */}
        <button
          className="w-full py-4 rounded-xl font-semibold border-2"
          style={{
            borderColor: primaryColor,
            color: primaryColor,
            backgroundColor: 'white',
            ...typography.button,
            fontSize: '16px',
          }}
        >
          {isSuccess ? 'Add More Money' : 'Retry'}
        </button>

        {/* Primary Button */}
        <button
          className="w-full py-4 rounded-xl text-white font-semibold"
          style={{
            backgroundColor: primaryColor,
            ...typography.button,
            fontSize: '16px',
          }}
        >
          {isSuccess ? 'Done' : 'Close'}
        </button>

        {/* Share Receipt */}
        {isSuccess && (
          <button
            className="w-full py-3 flex items-center justify-center gap-2"
            style={{
              color: primaryColor,
              ...typography.body,
              fontSize: '15px',
              fontWeight: 500,
            }}
          >
            <Share2 size={18} />
            Share Receipt
          </button>
        )}
      </div>
    </div>
  );
}
