'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, CircleCheckBig, CircleX, ChevronRight } from 'lucide-react';

interface HistoryScreenProps {
  variant?: 'list' | 'ptptn' | 'sspn' | 'reload-success' | 'reload-failed';
}

export function HistoryScreen({ variant = 'list' }: HistoryScreenProps) {
  const { primaryColor, textPrimaryColor, textSecondaryColor, currencySymbol, setCurrentScreen } = useCustomizationStore();
  const typography = useTypography();

  const showReceipt = variant !== 'list';
  const isSuccess = variant !== 'reload-failed';

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
        <h1 style={{ ...typography.h3, color: textPrimaryColor }}>
          {showReceipt ? 'Transaction Receipt' : 'History'}
        </h1>
      </div>

      {!showReceipt && (
        <div className="flex-1 overflow-auto px-6 py-5 space-y-3">
          {[
            { label: 'Reload Wallet', amount: '100.00', target: 'history-reload-success', ok: true, time: 'Today · 2:30 PM' },
            { label: 'PTPTN Payment', amount: '250.00', target: 'history-ptptn', ok: true, time: 'Today · 11:12 AM' },
            { label: 'SSPN Deposit', amount: '80.00', target: 'history-sspn', ok: true, time: 'Yesterday · 6:20 PM' },
            { label: 'Reload Wallet', amount: '100.00', target: 'history-reload-failed', ok: false, time: 'Yesterday · 9:10 AM' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(item.target)}
              className="w-full p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-left"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item.ok ? <CircleCheckBig size={16} className="text-emerald-500" /> : <CircleX size={16} className="text-rose-500" />}
                  <span style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span style={{ ...typography.caption, color: textSecondaryColor }}>{item.time}</span>
                <span style={{ ...typography.body, color: item.ok ? '#0F766E' : '#B91C1C', fontWeight: 600 }}>
                  {currencySymbol}{item.amount}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {showReceipt && (
        <div className="flex-1 px-6 py-6 overflow-auto">
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className="flex justify-center mb-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isSuccess ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                {isSuccess ? <CircleCheckBig size={26} className="text-emerald-600" /> : <CircleX size={26} className="text-rose-600" />}
              </div>
            </div>

            <p style={{ ...typography.h3, color: textPrimaryColor, textAlign: 'center' }} className="mb-1">
              {variant === 'ptptn' ? 'PTPTN Payment Complete' : variant === 'sspn' ? 'SSPN Receipt' : variant === 'reload-failed' ? 'Reload Failed' : 'Reload Successful'}
            </p>
            <p style={{ ...typography.small, color: textSecondaryColor, textAlign: 'center' }} className="mb-4">
              Ref: TXN-8923-0921
            </p>

            <div className="space-y-3">
              {[
                ['Amount', `${currencySymbol}${variant === 'ptptn' ? '250.00' : variant === 'sspn' ? '80.00' : '100.00'}`],
                ['Date', '19 Feb 2026 · 2:30 PM'],
                ['Method', variant === 'ptptn' ? 'FPX' : variant === 'sspn' ? 'Debit Card' : 'Saved Card'],
                ['Status', isSuccess ? 'Success' : 'Failed'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span style={{ ...typography.small, color: textSecondaryColor }}>{k}</span>
                  <span style={{ ...typography.small, color: textPrimaryColor, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="px-6 pb-6">
        <button
          onClick={() => setCurrentScreen(showReceipt ? 'history' : 'home')}
          className="w-full py-3.5 rounded-xl text-white"
          style={{ ...typography.button, backgroundColor: primaryColor }}
        >
          {showReceipt ? 'Back to History' : 'Back to Home'}
        </button>
      </div>
    </div>
  );
}
