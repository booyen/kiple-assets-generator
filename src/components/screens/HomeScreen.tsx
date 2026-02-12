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
} from 'lucide-react';

interface HomeScreenProps {
  hideBalance?: boolean;
}

export function HomeScreen({ hideBalance = false }: HomeScreenProps) {
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

  return (
    <div
      className="mobile-screen flex flex-col"
      style={{ backgroundColor: '#F8F9FB', fontFamily: typography.fontFamily }}
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
            <p style={{ ...typography.small, color: textSecondaryColor }}>
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
            <h1 style={{ ...typography.h1, color: textPrimaryColor }}>
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
          <button
            className="flex items-center gap-0.5 mt-1"
            style={{ ...typography.small, color: primaryColor, fontWeight: 500 }}
          >
            {texts.seeAnalytics}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Modules */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
            {activeModules.slice(0, 6).map((moduleKey) => {
              const iconOrText = moduleIcons[moduleKey];
              return (
                <button
                  key={moduleKey}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#F1F5F9' }}
                  >
                    {moduleKey === 'remittance' ? (
                      <span style={{ fontSize: '20px', fontWeight: 700, color: '#FDB022' }}>W</span>
                    ) : moduleKey === 'visa' ? (
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#1434CB', letterSpacing: '0.5px' }}>VISA</span>
                    ) : typeof iconOrText === 'string' ? (
                      <span>{iconOrText}</span>
                    ) : (
                      React.createElement(iconOrText, { size: 22, color: '#1E293B' })
                    )}
                  </div>
                  <span
                    className="text-center text-xs"
                    style={{ color: textPrimaryColor, fontSize: '11px' }}
                  >
                    {moduleLabels[moduleKey]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="px-6 mb-4">
        <div
          className="rounded-2xl h-28 overflow-hidden relative"
          style={{
            background: bannerImage ? undefined : `linear-gradient(135deg, ${primaryColor} 0%, #4169E1 100%)`,
          }}
        >
          {bannerImage ? (
            <img src={bannerImage} alt="Promotional Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="p-4 relative">
              <p className="text-white font-semibold text-sm leading-tight mb-1">
                Send your<br />
                Remittance with<br />
                kiple e-Ang Pows
              </p>
            </div>
          )}
          {/* Carousel dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="flex-1 px-6 pb-20">
        <h2 style={{ ...typography.h3, color: textPrimaryColor }} className="mb-3">
          Recent Transactions
        </h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {[
            { name: 'Reload Wallet', amount: '120.00', type: 'positive', time: 'Today, 2:30 PM' },
            { name: 'Transfer to Sarah', amount: '50.00', type: 'negative', time: 'Today, 11:45 AM' },
            { name: 'Bill Payment - TNB', amount: '85.50', type: 'negative', time: 'Yesterday' },
            { name: 'Mobile Reload', amount: '30.00', type: 'negative', time: 'Yesterday' },
            { name: 'Received from John', amount: '200.00', type: 'positive', time: '2 days ago' },
            { name: 'Charging Fee', amount: '0.53', type: 'negative', time: '2 days ago' },
          ].map((item, i, arr) => (
            <div
              key={i}
              className={`px-4 py-3 flex items-center justify-between ${
                i !== arr.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.type === 'negative' ? '#EF4444' : '#22C55E' }}
                />
                <div className="min-w-0 flex-1">
                  <p style={{ ...typography.small, color: textPrimaryColor, fontWeight: 500 }} className="truncate">
                    {item.name}
                  </p>
                  <p style={{ ...typography.caption, color: textSecondaryColor }}>
                    {item.time}
                  </p>
                </div>
              </div>
              <span
                className="flex-shrink-0 ml-2"
                style={{
                  ...typography.small,
                  fontWeight: 600,
                  color: item.type === 'negative' ? '#EF4444' : '#22C55E'
                }}
              >
                {item.type === 'negative' ? '-' : '+'}{currencySymbol}{item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeTab="home" primaryColor={primaryColor} />
    </div>
  );
}
