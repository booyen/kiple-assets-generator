'use client';

interface StatusBarProps {
  dark?: boolean;
  variant?: 'dark' | 'light';
  primaryColor?: string;
}

export function StatusBar({ dark = false, variant, primaryColor }: StatusBarProps) {
  // variant takes precedence over dark prop
  const textColor = variant === 'light' || dark ? '#FFFFFF' : '#1A1A2E';

  return (
    <div className="flex justify-between items-center px-6 py-3 h-11">
      <span className="text-[15px] font-semibold" style={{ color: textColor }}>
        9:41
      </span>
      <div className="flex items-center gap-1">
        {/* Signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="4" width="3" height="7" rx="1" fill={textColor} />
          <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill={textColor} />
          <rect x="9" y="1" width="3" height="10" rx="1" fill={textColor} />
          <rect x="13.5" y="0" width="3" height="11" rx="1" fill={textColor} />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2.4C10.5 2.4 12.8 3.3 14.5 4.8L15.4 3.7C13.4 1.9 10.8 0.8 8 0.8C5.2 0.8 2.6 1.9 0.6 3.7L1.5 4.8C3.2 3.3 5.5 2.4 8 2.4ZM8 5.6C9.7 5.6 11.3 6.2 12.5 7.2L13.4 6.1C11.9 4.9 10 4.1 8 4.1C6 4.1 4.1 4.9 2.6 6.1L3.5 7.2C4.7 6.2 6.3 5.6 8 5.6ZM8 8.8C8.9 8.8 9.7 9.1 10.4 9.6L11.3 8.5C10.3 7.8 9.2 7.3 8 7.3C6.8 7.3 5.7 7.8 4.7 8.5L5.6 9.6C6.3 9.1 7.1 8.8 8 8.8ZM8 12C8.8 12 9.4 11.4 9.4 10.6C9.4 9.8 8.8 9.2 8 9.2C7.2 9.2 6.6 9.8 6.6 10.6C6.6 11.4 7.2 12 8 12Z"
            fill={textColor}
          />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke={textColor} />
          <rect x="2" y="2" width="18" height="8" rx="1" fill={textColor} />
          <path d="M23 4V8C24 7.5 24 4.5 23 4Z" fill={textColor} />
        </svg>
      </div>
    </div>
  );
}
