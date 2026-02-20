'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, Car, Bike, Shield, CircleCheckBig, CircleX } from 'lucide-react';

interface InsuranceScreenProps {
  variant?: 'home' | 'details' | 'policy' | 'success' | 'failed';
}

export function InsuranceScreen({ variant = 'home' }: InsuranceScreenProps) {
  const { primaryColor, textPrimaryColor, textSecondaryColor, setCurrentScreen } = useCustomizationStore();
  const typography = useTypography();

  const isResult = variant === 'success' || variant === 'failed';

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
        <h1 style={{ ...typography.h3, color: textPrimaryColor }}>Insurances</h1>
      </div>

      <div className="flex-1 px-6 py-5 overflow-auto">
        {variant === 'home' && (
          <div className="space-y-3">
            <button onClick={() => setCurrentScreen('insurance-details')} className="w-full p-4 rounded-xl bg-white border border-slate-200 text-left">
              <div className="flex items-center gap-3 mb-1">
                <Car size={18} style={{ color: primaryColor }} />
                <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>Car Insurance</p>
              </div>
              <p style={{ ...typography.small, color: textSecondaryColor }}>Protect your vehicle with flexible annual plans.</p>
            </button>
            <button onClick={() => setCurrentScreen('insurance-details')} className="w-full p-4 rounded-xl bg-white border border-slate-200 text-left">
              <div className="flex items-center gap-3 mb-1">
                <Bike size={18} style={{ color: primaryColor }} />
                <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>Motorcycle Insurance</p>
              </div>
              <p style={{ ...typography.small, color: textSecondaryColor }}>Fast policy issuance with digital certificate.</p>
            </button>
            <button onClick={() => setCurrentScreen('insurance-policy')} className="w-full p-4 rounded-xl bg-white border border-slate-200 text-left">
              <div className="flex items-center gap-3 mb-1">
                <Shield size={18} style={{ color: primaryColor }} />
                <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>My Policy</p>
              </div>
              <p style={{ ...typography.small, color: textSecondaryColor }}>Review active plans and renewals.</p>
            </button>
          </div>
        )}

        {variant === 'details' && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
              {[
                ['Plan', 'Comprehensive Plus'],
                ['Coverage', 'RM 120,000'],
                ['Period', '12 months'],
                ['Premium', 'RM 39 / month'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span style={{ ...typography.small, color: textSecondaryColor }}>{k}</span>
                  <span style={{ ...typography.small, color: textPrimaryColor, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setCurrentScreen('insurance-success')} className="w-full py-3.5 rounded-xl text-white" style={{ ...typography.button, backgroundColor: primaryColor }}>
              Purchase Policy
            </button>
            <button onClick={() => setCurrentScreen('insurance-failed')} className="w-full py-3.5 rounded-xl border" style={{ ...typography.button, color: primaryColor, borderColor: primaryColor }}>
              Simulate Failed Payment
            </button>
          </div>
        )}

        {variant === 'policy' && (
          <div className="space-y-3">
            {['Car Insurance', 'Motorcycle Insurance'].map((item, i) => (
              <div key={item} className="bg-white border border-slate-200 rounded-xl p-4">
                <p style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>{item}</p>
                <p style={{ ...typography.small, color: textSecondaryColor }}>Policy #{i === 0 ? 'CAR-9021' : 'MOTO-1209'}</p>
                <button
                  onClick={() => setCurrentScreen('insurance-details')}
                  className="mt-3 px-3 py-1.5 rounded-lg text-xs"
                  style={{ backgroundColor: `${primaryColor}12`, color: primaryColor, fontWeight: 600 }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {isResult && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${variant === 'success' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              {variant === 'success' ? (
                <CircleCheckBig size={30} className="text-emerald-600" />
              ) : (
                <CircleX size={30} className="text-rose-600" />
              )}
            </div>
            <h2 style={{ ...typography.h3, color: textPrimaryColor }} className="mb-2">
              {variant === 'success' ? 'Insurance Purchased' : 'Payment Failed'}
            </h2>
            <p style={{ ...typography.small, color: textSecondaryColor }} className="mb-6">
              {variant === 'success'
                ? 'Your policy is active. Certificate is available in My Policy.'
                : 'We could not process payment. Please try another method.'}
            </p>
            <button onClick={() => setCurrentScreen(variant === 'success' ? 'insurance-policy' : 'insurance-details')} className="w-full py-3.5 rounded-xl text-white" style={{ ...typography.button, backgroundColor: primaryColor }}>
              {variant === 'success' ? 'Go to My Policy' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
