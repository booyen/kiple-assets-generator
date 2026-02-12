'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';

export function SplashScreen() {
  const { logo, appName, backgroundColor } = useCustomizationStore();

  // Use custom logo if provided, otherwise use default Kiple logo
  const logoSrc = logo || '/img/klw.png';

  return (
    <div
      className="mobile-screen flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <img
        src={logoSrc}
        alt={appName}
        style={{ width: '200px' }}
        className="object-contain"
      />
    </div>
  );
}
