'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { DeviceFrame, ZoomableCanvas } from '@/components/ui';
import { screens, renderScreen } from '@/components/screens';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PreviewProps {
  screenRef: React.RefObject<HTMLDivElement | null>;
}

export function Preview({ screenRef }: PreviewProps) {
  const { currentScreen, setCurrentScreen, includeDeviceFrame, deviceType } = useCustomizationStore();

  const currentIndex = screens.findIndex((s) => s.id === currentScreen);
  const currentScreenInfo = screens[currentIndex];

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : screens.length - 1;
    setCurrentScreen(screens[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < screens.length - 1 ? currentIndex + 1 : 0;
    setCurrentScreen(screens[nextIndex].id);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-slate-100 relative overflow-hidden">
      {/* Screen name badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
          {currentScreenInfo?.name} ({currentIndex + 1}/{screens.length})
        </span>
      </div>

      {/* Zoomable canvas */}
      <ZoomableCanvas initialZoom={0.8} minZoom={0.25} maxZoom={2}>
        <div className="relative">
          {/* Wrap entire device frame with ref for export */}
          <div ref={screenRef} className="export-canvas">
            <DeviceFrame deviceType={deviceType} showFrame={includeDeviceFrame}>
              <div
                style={{
                  width: '375px',
                  height: '812px',
                }}
              >
                {renderScreen(currentScreen)}
              </div>
            </DeviceFrame>
          </div>

          {/* Screen shadow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              borderRadius: includeDeviceFrame ? '55px' : '44px',
              zIndex: -1,
            }}
          />
        </div>
      </ZoomableCanvas>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white rounded-full shadow-lg border border-slate-200 px-2 py-1.5">
        <button
          onClick={handlePrevious}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          title="Previous screen"
        >
          <ChevronLeft size={20} className="text-slate-700" />
        </button>

        {/* Screen dots */}
        <div className="flex gap-1.5 px-2">
          {screens.slice(
            Math.max(0, currentIndex - 3),
            Math.min(screens.length, currentIndex + 4)
          ).map((screen) => (
            <button
              key={screen.id}
              onClick={() => setCurrentScreen(screen.id)}
              className={`h-2 rounded-full transition-all ${
                screen.id === currentScreen
                  ? 'w-6 bg-blue-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={screen.name}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          title="Next screen"
        >
          <ChevronRight size={20} className="text-slate-700" />
        </button>
      </div>
    </div>
  );
}
