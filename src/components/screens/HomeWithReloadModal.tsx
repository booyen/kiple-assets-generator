'use client';

import React from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { BottomNav } from './shared/BottomNav';
import { Logo } from './shared/Logo';
import {
  Bell,
  ChevronRight,
  ArrowRightLeft,
  CreditCard,
  Receipt,
  Smartphone,
  MoreHorizontal,
  Eye,
  EyeOff,
  Plus,
  Info,
  X,
  Delete,
} from 'lucide-react';

interface HomeWithReloadModalProps {
  hideBalance?: boolean;
}

export function HomeWithReloadModal({ hideBalance = false }: HomeWithReloadModalProps) {
  const {
    logo,
    appName,
    primaryColor,
    textPrimaryColor,
    textSecondaryColor,
    currencySymbol,
    balanceAmount,
    texts,
    modules,
    bannerImage,
  } = useCustomizationStore();

  const typography = useTypography();

  const moduleIcons = {
    transfer: ArrowRightLeft,
    remittance: 'W',
    visa: 'VISA',
    payBills: Receipt,
    mobileReload: Smartphone,
    more: MoreHorizontal,
  };

  const moduleLabels = {
    transfer: texts.transferLabel,
    remittance: texts.remittanceLabel,
    visa: texts.visaLabel,
    payBills: texts.payBillsLabel,
    mobileReload: texts.mobileReloadLabel,
    more: texts.moreLabel,
  };

  const activeModules = Object.entries(modules)
    .filter(([, visible]) => visible)
    .map(([key]) => key as keyof typeof moduleIcons);

  const selectedAmount = '100.00';
  const quickAmounts = ['20', '50', '100', '150'];
  const selectedQuick = '150';

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
    <div className="mobile-screen flex flex-col relative">
      {/* Home Screen Background (slightly dimmed) */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{ backgroundColor: '#F8F9FB', fontFamily: typography.fontFamily, opacity: 0.5 }}
      >
        {/* Header with white background */}
        <div style={{ backgroundColor: '#FFFFFF' }}>
          <StatusBar />

          {/* Header */}
          <div className="flex justify-between items-center px-6 py-3">
            <Logo logo={logo} appName={appName} primaryColor={primaryColor} size="sm" />
            <button className="p-1">
              <Bell size={22} style={{ color: textPrimaryColor }} />
            </button>
          </div>

          {/* Balance */}
          <div className="px-6 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <p style={{ ...typography.small, color: textSecondaryColor, fontSize: '12px' }}>
                {texts.walletBalanceLabel}
              </p>
              <button>
                {hideBalance ? (
                  <EyeOff size={14} style={{ color: textSecondaryColor }} />
                ) : (
                  <Eye size={14} style={{ color: textSecondaryColor }} />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <h1 style={{ ...typography.h1, color: textPrimaryColor, fontSize: '28px', fontWeight: 700 }}>
                {hideBalance ? '********' : `${currencySymbol}${balanceAmount}`}
              </h1>
              <Info size={16} style={{ color: primaryColor }} />
              <button
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                <Plus size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="px-6 py-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-x-4 gap-y-4">
              {activeModules.slice(0, 6).map((moduleKey) => {
                const iconOrText = moduleIcons[moduleKey];
                return (
                  <button key={moduleKey} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: '#F1F5F9' }}
                    >
                      {moduleKey === 'remittance' ? (
                        <span style={{ fontSize: '20px', fontWeight: 700, color: '#FDB022' }}>W</span>
                      ) : moduleKey === 'visa' ? (
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#1434CB', letterSpacing: '0.5px' }}>
                          VISA
                        </span>
                      ) : typeof iconOrText === 'string' ? (
                        <span>{iconOrText}</span>
                      ) : (
                        React.createElement(iconOrText, { size: 22, color: '#1E293B' })
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Reload Amount Modal Overlay */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full bg-white rounded-t-3xl shadow-2xl" style={{ maxHeight: '85%' }}>
          {/* Modal Content */}
          <div className="flex flex-col h-full">
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
                    {currencySymbol}
                    {amount}
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
        </div>
      </div>
    </div>
  );
}
