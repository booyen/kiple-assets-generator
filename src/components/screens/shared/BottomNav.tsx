'use client';

import { Home, QrCode, History, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: 'home' | 'scan' | 'history' | 'profile';
  primaryColor: string;
  variant?: 'light' | 'dark';
}

export function BottomNav({ activeTab = 'home', primaryColor, variant = 'light' }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'scan', icon: QrCode, label: 'Scan' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const isDark = variant === 'dark';
  const bgColor = isDark ? 'rgba(15, 23, 42, 0.95)' : 'white';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#f1f5f9';
  const inactiveColor = isDark ? 'rgba(255,255,255,0.4)' : '#9CA3AF';

  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-4 py-2 pb-6"
      style={{
        backgroundColor: bgColor,
        borderTop: `1px solid ${borderColor}`,
        backdropFilter: isDark ? 'blur(12px)' : undefined,
      }}
    >
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <div
                className={`p-2 rounded-xl transition-colors ${
                  isActive ? 'bg-opacity-10' : ''
                }`}
                style={isActive ? { backgroundColor: isDark ? `${primaryColor}30` : `${primaryColor}15` } : {}}
              >
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ color: isActive ? primaryColor : inactiveColor }}
                />
              </div>
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? primaryColor : inactiveColor }}
              >
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
