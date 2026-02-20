'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { useTypography } from '@/hooks/useTypography';
import { StatusBar } from './shared/StatusBar';
import { ArrowLeft, BellOff, ShieldAlert } from 'lucide-react';

interface NotificationsScreenProps {
  variant?: 'default' | 'empty' | 'permission';
}

export function NotificationsScreen({ variant = 'default' }: NotificationsScreenProps) {
  const { primaryColor, textPrimaryColor, textSecondaryColor, setCurrentScreen } = useCustomizationStore();
  const typography = useTypography();

  const notifications = [
    { title: 'Reload successful', desc: 'RM100 was added to your wallet balance.', time: '2m ago' },
    { title: 'Transfer received', desc: 'You received RM45.00 from Sarah.', time: '15m ago' },
    { title: 'Promo alert', desc: 'Get cashback on Scan & Pay this weekend.', time: '1h ago' },
    { title: 'KYC reminder', desc: 'Complete verification to unlock all features.', time: 'Yesterday' },
  ];

  return (
    <div className="mobile-screen flex flex-col bg-white">
      <StatusBar />

      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor}10` }}
        >
          <ArrowLeft size={20} style={{ color: primaryColor }} />
        </button>
        <h1 style={{ ...typography.h3, color: textPrimaryColor }}>Notifications</h1>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5">
        {variant === 'permission' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-4">
              <ShieldAlert size={28} className="text-amber-500" />
            </div>
            <h2 style={{ ...typography.h3, color: textPrimaryColor }} className="mb-2">Enable Notifications</h2>
            <p style={{ ...typography.small, color: textSecondaryColor }} className="mb-6">
              Turn on push notifications to get real-time payment and security updates.
            </p>
            <button
              onClick={() => setCurrentScreen('notification')}
              className="w-full py-3.5 rounded-xl text-white"
              style={{ ...typography.button, backgroundColor: primaryColor }}
            >
              Allow Notifications
            </button>
          </div>
        )}

        {variant === 'empty' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <BellOff size={28} className="text-slate-500" />
            </div>
            <h2 style={{ ...typography.h3, color: textPrimaryColor }} className="mb-2">No notifications yet</h2>
            <p style={{ ...typography.small, color: textSecondaryColor }}>
              You are all caught up. We will show important updates here.
            </p>
          </div>
        )}

        {variant === 'default' && (
          <div className="space-y-3">
            {notifications.map((item, index) => (
              <button
                key={index}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors"
                onClick={() => setCurrentScreen(index % 2 === 0 ? 'history-reload-success' : 'history')}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 style={{ ...typography.body, color: textPrimaryColor, fontWeight: 600 }}>{item.title}</h3>
                  <span style={{ ...typography.caption, color: textSecondaryColor }}>{item.time}</span>
                </div>
                <p style={{ ...typography.small, color: textSecondaryColor }} className="mt-1">
                  {item.desc}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
