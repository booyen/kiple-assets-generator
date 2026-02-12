'use client';

interface LogoProps {
  logo: string | null;
  appName: string;
  primaryColor: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ logo, appName, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { image: 'h-6', text: 'text-lg' },
    md: { image: 'h-8', text: 'text-2xl' },
    lg: { image: 'h-16', text: 'text-4xl' },
  };

  // Use custom logo if provided, otherwise use default Kiple logo
  const logoSrc = logo || '/img/klw.png';

  return (
    <img
      src={logoSrc}
      alt={appName}
      className={`${sizes[size].image} object-contain`}
    />
  );
}
