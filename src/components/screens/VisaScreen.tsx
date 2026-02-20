'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, CreditCard, ShieldCheck, CircleCheckBig } from 'lucide-react';

interface VisaScreenProps {
  variant?: 'home' | 'application' | 'confirm-pin' | 'card-front' | 'application-success' | 'reload';
}

export function VisaScreen({ variant = 'home' }: VisaScreenProps) {
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
        <h1 style={{ ...typography.h3, color: textPrimaryColor }}>VISA</h1>
      </div>

      <div className="flex-1 px-6 py-5 overflow-auto">
        {(variant === 'home' || variant === 'card-front') && (
          <div className="space-y-4">
            <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(130deg, ${primaryColor}, #0F172A)` }}>
              <p className="text-xs opacity-80">kiple Virtual Card</p>
              <p className="text-lg tracking-[0.25em] mt-5 mb-5">4123 56•• •••• 8090</p>
              <div className="flex items-center justify-between text-xs opacity-90">
                <span>AHMAD BIN A</span>
                <span>12/29</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentScreen('visa-reload')}
                className="p-3 rounded-xl bg-white border border-slate-200 text-left"
              >
                <p style={{ ...typography.small, color: textPrimaryColor, fontWeight: 600 }}>Reload Card</p>
                <p style={{ ...typography.caption, color: textSecondaryColor }}>{currencySymbol}0.00 fee</p>
              </button>
              <button
                onClick={() => setCurrentScreen('transfer-show-card')}
                className="p-3 rounded-xl bg-white border border-slate-200 text-left"
              >
                <p style={{ ...typography.small, color: textPrimaryColor, fontWeight: 600 }}>Show Details</p>
                <p style={{ ...typography.caption, color: textSecondaryColor }}>Card number & CVV</p>
              </button>
            </div>
          </div>
        )}

        {variant === 'application' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>Apply for Virtual VISA</p>
              <p style={{ ...typography.small, color: textSecondaryColor }} className="mt-1">
                Instantly create your virtual card for online and international payments.
              </p>
            </div>
            <button
              onClick={() => setCurrentScreen('visa-confirm-pin')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Continue Application
            </button>
          </div>
        )}

        {variant === 'confirm-pin' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p style={{ ...typography.caption, color: textSecondaryColor }}>Confirm 6-digit PIN</p>
              <p style={{ ...typography.h3, color: textPrimaryColor }} className="tracking-[0.35em] mt-2">••••••</p>
            </div>
            <button
              onClick={() => setCurrentScreen('visa-application-success')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Confirm PIN
            </button>
          </div>
        )}

        {variant === 'application-success' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CircleCheckBig size={30} className="text-emerald-600" />
            </div>
            <h2 style={{ ...typography.h3, color: textPrimaryColor }} className="mb-2">Application Successful</h2>
            <p style={{ ...typography.small, color: textSecondaryColor }} className="mb-6">
              Your virtual VISA card is now ready.
            </p>
            <button
              onClick={() => setCurrentScreen('visa-card-front')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              View Card
            </button>
          </div>
        )}

        {variant === 'reload' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
              <CreditCard size={18} style={{ color: primaryColor }} />
              <div>
                <p style={{ ...typography.small, color: textPrimaryColor, fontWeight: 600 }}>Reload VISA Wallet</p>
                <p style={{ ...typography.caption, color: textSecondaryColor }}>Use FPX or debit card</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
              <ShieldCheck size={18} style={{ color: primaryColor }} />
              <div>
                <p style={{ ...typography.small, color: textPrimaryColor, fontWeight: 600 }}>3DS Secure Enabled</p>
                <p style={{ ...typography.caption, color: textSecondaryColor }}>Extra security for online payments</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('reload-method-banking')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Continue to Reload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
