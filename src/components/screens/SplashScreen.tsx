'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Logo } from './shared/Logo';

export function SplashScreen() {
  const { logo, appName, primaryColor, backgroundColor } = useCustomizationStore();

  return (
    <div
      className="mobile-screen flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <Logo
        logo={logo}
        appName={appName}
        primaryColor={primaryColor}
        size="lg"
      />
    </div>
  );
}
