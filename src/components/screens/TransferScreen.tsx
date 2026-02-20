'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, QrCode, UserRound, Building2, CircleCheckBig } from 'lucide-react';

interface TransferScreenProps {
  variant?: 'start' | 'favorite' | 'duitnow' | 'amount' | 'confirm' | 'success' | 'show-card';
}

export function TransferScreen({ variant = 'start' }: TransferScreenProps) {
  const { primaryColor, textPrimaryColor, textSecondaryColor, currencySymbol, setCurrentScreen } = useCustomizationStore();
  const typography = useTypography();

  return (
    <div className="mobile-screen flex flex-col bg-slate-50">
      <StatusBar />

      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center gap-3">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <ArrowLeft size={20} style={{ color: primaryColor }} />
        </button>
        <h1 style={{ ...typography.h3, color: textPrimaryColor }}>Transfer</h1>
      </div>

      <div className="flex-1 px-6 py-5 overflow-auto">
        {variant === 'start' && (
          <div className="space-y-3">
            <button
              onClick={() => setCurrentScreen('transfer-favorite')}
              className="w-full p-4 rounded-xl bg-white border border-slate-200 text-left"
            >
              <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>Transfer to Favorite</p>
              <p style={{ ...typography.small, color: textSecondaryColor }}>Quickly send to saved recipients.</p>
            </button>
            <button
              onClick={() => setCurrentScreen('transfer-duitnow')}
              className="w-full p-4 rounded-xl bg-white border border-slate-200 text-left"
            >
              <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>Transfer via DuitNow</p>
              <p style={{ ...typography.small, color: textSecondaryColor }}>Use account number, IC, or mobile number.</p>
            </button>
          </div>
        )}

        {variant === 'favorite' && (
          <div className="space-y-3">
            {['Sarah Ahmad', 'Lim Wei', 'Aina Sofea'].map((name, i) => (
              <button
                key={name}
                onClick={() => setCurrentScreen(i === 0 ? 'transfer-show-card' : 'transfer-amount')}
                className="w-full p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <UserRound size={18} className="text-slate-600" />
                </div>
                <div className="text-left">
                  <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>{name}</p>
                  <p style={{ ...typography.small, color: textSecondaryColor }}>Maybank · **** 7234</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {variant === 'duitnow' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <p style={{ ...typography.caption, color: textSecondaryColor }}>Recipient ID</p>
              <p style={{ ...typography.body, color: textPrimaryColor }}>012-3456789</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center gap-2">
                <QrCode size={18} style={{ color: primaryColor }} />
                <span style={{ ...typography.small, color: textPrimaryColor }}>Scan QR</span>
              </button>
              <button className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center gap-2">
                <Building2 size={18} style={{ color: primaryColor }} />
                <span style={{ ...typography.small, color: textPrimaryColor }}>Bank List</span>
              </button>
            </div>
            <button
              onClick={() => setCurrentScreen('transfer-amount')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Continue
            </button>
          </div>
        )}

        {variant === 'amount' && (
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
              <p style={{ ...typography.caption, color: textSecondaryColor }}>Amount</p>
              <p style={{ ...typography.h2, color: primaryColor }}>{currencySymbol}120.00</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p style={{ ...typography.caption, color: textSecondaryColor }}>Note</p>
              <p style={{ ...typography.body, color: textPrimaryColor }}>Dinner split</p>
            </div>
            <button
              onClick={() => setCurrentScreen('transfer-confirm')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Review Transfer
            </button>
          </div>
        )}

        {variant === 'confirm' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              {[
                ['To', 'Sarah Ahmad'],
                ['Bank', 'Maybank · ****7234'],
                ['Amount', `${currencySymbol}120.00`],
                ['Fee', `${currencySymbol}0.00`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span style={{ ...typography.small, color: textSecondaryColor }}>{k}</span>
                  <span style={{ ...typography.small, color: textPrimaryColor, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentScreen('transfer-success')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Confirm Transfer
            </button>
          </div>
        )}

        {variant === 'success' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-18 h-18 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CircleCheckBig size={34} className="text-emerald-600" />
            </div>
            <h2 style={{ ...typography.h3, color: textPrimaryColor }} className="mb-2">Transfer Successful</h2>
            <p style={{ ...typography.small, color: textSecondaryColor }} className="mb-6">
              {currencySymbol}120.00 sent to Sarah Ahmad.
            </p>
            <button
              onClick={() => setCurrentScreen('history')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              View in History
            </button>
          </div>
        )}

        {variant === 'show-card' && (
          <div className="space-y-4">
            <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, #1D4ED8)` }}>
              <p className="text-sm opacity-90 mb-4">Saved Recipient Card</p>
              <p className="text-xl font-semibold tracking-wide mb-6">Sarah Ahmad</p>
              <p className="text-sm opacity-90">Maybank · 5641 **** 7234</p>
            </div>
            <button
              onClick={() => setCurrentScreen('transfer-amount')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Transfer to this recipient
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
