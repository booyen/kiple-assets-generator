'use client';

import { ReactNode } from 'react';
import { DeviceType } from '@/types';

interface DeviceFrameProps {
  children: ReactNode;
  deviceType: DeviceType;
  showFrame: boolean;
}

// Screen size: 375 x 812 (iPhone standard)
const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812;

// Frame padding/bezel sizes
const IPHONE_BEZEL = 12;
const ANDROID_BEZEL = 10;

export function DeviceFrame({ children, deviceType, showFrame }: DeviceFrameProps) {
  if (!showFrame) {
    return <div className="rounded-[44px] overflow-hidden">{children}</div>;
  }

  if (deviceType === 'iphone') {
    const frameWidth = SCREEN_WIDTH + (IPHONE_BEZEL * 2);
    const frameHeight = SCREEN_HEIGHT + (IPHONE_BEZEL * 2);

    return (
      <div
        className="relative"
        style={{ width: frameWidth, height: frameHeight }}
      >
        {/* Frame background - behind everything */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(145deg, #2C2C2E 0%, #1C1C1E 100%)',
            borderRadius: '55px',
          }}
        />

        {/* Screen content container - in the middle */}
        <div
          className="absolute overflow-hidden"
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            left: IPHONE_BEZEL,
            top: IPHONE_BEZEL,
            borderRadius: '44px',
            zIndex: 1,
          }}
        >
          {children}
        </div>

        {/* Frame overlay elements - on top but with pointer-events-none */}
        <svg
          width={frameWidth}
          height={frameHeight}
          viewBox={`0 0 ${frameWidth} ${frameHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {/* Dynamic Island */}
          <rect
            x={(frameWidth - 126) / 2}
            y={IPHONE_BEZEL + 10}
            width="126"
            height="34"
            rx="17"
            fill="#1C1C1E"
          />
          {/* Side buttons - Silent switch */}
          <rect x="-2" y="140" width="4" height="30" rx="2" fill="#3C3C3E" />
          {/* Volume up */}
          <rect x="-2" y="190" width="4" height="55" rx="2" fill="#3C3C3E" />
          {/* Volume down */}
          <rect x="-2" y="255" width="4" height="55" rx="2" fill="#3C3C3E" />
          {/* Power button */}
          <rect x={frameWidth - 2} y="200" width="4" height="80" rx="2" fill="#3C3C3E" />
        </svg>

        {/* Frame border highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '55px',
            boxShadow: 'inset 0 0 0 3px #3C3C3E, inset 0 0 0 4px #1C1C1E',
            zIndex: 3,
          }}
        />
      </div>
    );
  }

  // Android (Samsung-style) frame
  const frameWidth = SCREEN_WIDTH + (ANDROID_BEZEL * 2);
  const frameHeight = SCREEN_HEIGHT + (ANDROID_BEZEL * 2);

  return (
    <div
      className="relative"
      style={{ width: frameWidth, height: frameHeight }}
    >
      {/* Frame background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(145deg, #2C2C2E 0%, #1C1C1E 100%)',
          borderRadius: '38px',
        }}
      />

      {/* Screen content container */}
      <div
        className="absolute overflow-hidden"
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          left: ANDROID_BEZEL,
          top: ANDROID_BEZEL,
          borderRadius: '32px',
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Frame overlay elements */}
      <svg
        width={frameWidth}
        height={frameHeight}
        viewBox={`0 0 ${frameWidth} ${frameHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        {/* Front camera (punch hole) */}
        <circle
          cx={frameWidth / 2}
          cy={ANDROID_BEZEL + 18}
          r="6"
          fill="#1C1C1E"
        />
        {/* Volume buttons */}
        <rect x={frameWidth - 2} y="160" width="4" height="60" rx="2" fill="#3C3C3E" />
        {/* Power button */}
        <rect x={frameWidth - 2} y="240" width="4" height="45" rx="2" fill="#3C3C3E" />
      </svg>

      {/* Frame border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: '38px',
          boxShadow: 'inset 0 0 0 2px #3C3C3E, inset 0 0 0 3px #1C1C1E',
          zIndex: 3,
        }}
      />
    </div>
  );
}
