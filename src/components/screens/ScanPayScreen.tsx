'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, ScanLine, CircleCheckBig, CircleX } from 'lucide-react';

interface ScanPayScreenProps {
  variant?: 'scan' | 'enter-amount' | 'confirm-pin' | 'success' | 'failed';
}

export function ScanPayScreen({ variant = 'scan' }: ScanPayScreenProps) {
  const { primaryColor, textPrimaryColor, textSecondaryColor, currencySymbol, setCurrentScreen } = useCustomizationStore();
  const typography = useTypography();

  return (
    <div className="mobile-screen flex flex-col bg-slate-900">
      <StatusBar variant="light" />

      <div className="px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 style={{ ...typography.h3, color: '#FFFFFF' }}>Scan & Pay</h1>
      </div>

      <div className="flex-1 px-6 py-5">
        {variant === 'scan' && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-64 h-64 border-2 border-white/80 rounded-3xl relative mb-8">
              <div className="absolute inset-5 border border-white/30 rounded-2xl" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-7 text-white/90">
                <ScanLine size={22} />
              </div>
            </div>
            <p className="text-white/90 text-center mb-6">Align QR code within the frame</p>
            <button onClick={() => setCurrentScreen('scanpay-enter-amount')} className="w-full py-3.5 rounded-xl text-white" style={{ ...typography.button, backgroundColor: primaryColor }}>
              QR Detected
            </button>
          </div>
        )}

        {variant !== 'scan' && (
          <div className="bg-white rounded-2xl p-5 h-full flex flex-col">
            {variant === 'enter-amount' && (
              <div className="space-y-4">
                <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>Enter Amount to Pay</p>
                <div className="rounded-xl border border-slate-200 p-4 text-center">
                  <p style={{ ...typography.h2, color: primaryColor }}>{currencySymbol} 32.00</p>
                  <p style={{ ...typography.caption, color: textSecondaryColor }}>Merchant: Kopi Satu Cafe</p>
                </div>
                <button onClick={() => setCurrentScreen('scanpay-confirm-pin')} className="w-full py-3.5 rounded-xl text-white" style={{ ...typography.button, backgroundColor: primaryColor }}>
                  Continue
                </button>
              </div>
            )}

            {variant === 'confirm-pin' && (
              <div className="space-y-4">
                <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>Confirm PIN</p>
                <div className="rounded-xl border border-slate-200 p-4 text-center">
                  <p style={{ ...typography.caption, color: textSecondaryColor }}>Enter 6-digit PIN</p>
                  <p style={{ ...typography.h3, color: textPrimaryColor }} className="tracking-[0.35em] mt-2">••••••</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setCurrentScreen('scanpay-success')} className="py-3.5 rounded-xl text-white" style={{ ...typography.button, backgroundColor: primaryColor }}>
                    Approve
                  </button>
                  <button onClick={() => setCurrentScreen('scanpay-failed')} className="py-3.5 rounded-xl border" style={{ ...typography.button, color: primaryColor, borderColor: primaryColor }}>
                    Simulate Fail
                  </button>
                </div>
              </div>
            )}

            {(variant === 'success' || variant === 'failed') && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${variant === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                  {variant === 'success' ? <CircleCheckBig size={30} className="text-emerald-600" /> : <CircleX size={30} className="text-rose-600" />}
                </div>
                <h2 style={{ ...typography.h3, color: textPrimaryColor }} className="mb-2">
                  {variant === 'success' ? 'Payment Success' : 'Payment Failed'}
                </h2>
                <p style={{ ...typography.small, color: textSecondaryColor }} className="mb-6">
                  {variant === 'success' ? 'RM32.00 paid to Kopi Satu Cafe.' : 'Unable to complete payment.'}
                </p>
                <button onClick={() => setCurrentScreen('home')} className="w-full py-3.5 rounded-xl text-white" style={{ ...typography.button, backgroundColor: primaryColor }}>
                  Back to Home
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
