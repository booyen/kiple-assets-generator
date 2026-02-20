'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { Sidebar, Preview, ExportPanel } from '@/components/dashboard';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { screens } from '@/components/screens';
import { DeviceFrame } from '@/components/ui';
import { downloadElement, generateFilename, exportElement } from '@/lib/exportImage';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Grid3X3, Sparkles, Layers, Keyboard } from 'lucide-react';

export default function Dashboard() {
  const screenRef = useRef<HTMLDivElement>(null);
  const { currentScreen, selectedScreens, exportFormat } = useCustomizationStore();
  const [exportProgress, setExportProgress] = useState<string | null>(null);

  const handleExportCurrent = useCallback(async () => {
    if (!screenRef.current) return;

    const filename = generateFilename(currentScreen, exportFormat);
    await downloadElement(screenRef.current, {
      format: exportFormat,
      filename,
      scale: 2,
    });
  }, [currentScreen, exportFormat]);

  const handleExportSelected = useCallback(async () => {
    if (selectedScreens.length === 0) return;

    const store = useCustomizationStore.getState();
    const { includeDeviceFrame, deviceType, exportFormat } = store;

    setExportProgress('Preparing export...');

    const zip = new JSZip();
    const folder = zip.folder('screens');

    if (!folder) {
      setExportProgress(null);
      return;
    }

    // Create a hidden container for rendering
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    try {
      for (let i = 0; i < selectedScreens.length; i++) {
        const screenId = selectedScreens[i];
        setExportProgress(`Exporting ${i + 1} of ${selectedScreens.length}...`);

        // Create a temporary element for this screen
        const tempDiv = document.createElement('div');
        container.appendChild(tempDiv);

        // Render the screen using React
        const { createRoot } = await import('react-dom/client');
        const root = createRoot(tempDiv);

        // Create wrapper that includes DeviceFrame if needed
        const ScreenWrapper = () => {
          const Component = screens.find(s => s.id === screenId)?.component;
          if (!Component) return null;

          return (
            <DeviceFrame deviceType={deviceType} showFrame={includeDeviceFrame}>
              <div style={{ width: '375px', height: '812px' }}>
                <Component />
              </div>
            </DeviceFrame>
          );
        };

        root.render(<ScreenWrapper />);

        // Wait for render to complete
        await new Promise(resolve => setTimeout(resolve, 150));

        // Export the element
        const blob = await exportElement(tempDiv, {
          format: exportFormat,
          scale: 2,
        });

        const filename = generateFilename(screenId, exportFormat);
        folder.file(filename, blob);

        // Cleanup
        root.unmount();
        container.removeChild(tempDiv);
      }

      // Generate and download ZIP
      setExportProgress('Creating ZIP file...');
      const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      const timestamp = new Date().toISOString().split('T')[0];
      saveAs(zipBlob, `kiple-screens-${timestamp}.zip`);
    } finally {
      document.body.removeChild(container);
      setExportProgress(null);
    }
  }, [selectedScreens]);

  const handleExportAll = useCallback(async () => {
    const allScreenIds = screens.map(s => s.id);
    const store = useCustomizationStore.getState();
    const { includeDeviceFrame, deviceType, exportFormat } = store;

    store.selectAllScreens();

    setExportProgress('Preparing export...');

    const zip = new JSZip();
    const folder = zip.folder('screens');

    if (!folder) {
      setExportProgress(null);
      return;
    }

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    try {
      for (let i = 0; i < allScreenIds.length; i++) {
        const screenId = allScreenIds[i];
        setExportProgress(`Exporting ${i + 1} of ${allScreenIds.length}...`);

        const tempDiv = document.createElement('div');
        container.appendChild(tempDiv);

        const { createRoot } = await import('react-dom/client');
        const root = createRoot(tempDiv);

        const ScreenWrapper = () => {
          const Component = screens.find(s => s.id === screenId)?.component;
          if (!Component) return null;

          return (
            <DeviceFrame deviceType={deviceType} showFrame={includeDeviceFrame}>
              <div style={{ width: '375px', height: '812px' }}>
                <Component />
              </div>
            </DeviceFrame>
          );
        };

        root.render(<ScreenWrapper />);
        await new Promise(resolve => setTimeout(resolve, 150));

        const blob = await exportElement(tempDiv, {
          format: exportFormat,
          scale: 2,
        });

        const filename = generateFilename(screenId, exportFormat);
        folder.file(filename, blob);

        root.unmount();
        container.removeChild(tempDiv);
      }

      setExportProgress('Creating ZIP file...');
      const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      const timestamp = new Date().toISOString().split('T')[0];
      saveAs(zipBlob, `kiple-all-screens-${timestamp}.zip`);
    } finally {
      document.body.removeChild(container);
      setExportProgress(null);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      const isTyping =
        tagName === 'input' ||
        tagName === 'textarea' ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        const searchInput = document.getElementById('screen-search-input') as HTMLInputElement | null;
        searchInput?.focus();
        searchInput?.select();
        return;
      }

      if (isTyping) return;

      if (event.key === ']' || event.key === 'ArrowRight') {
        event.preventDefault();
        const state = useCustomizationStore.getState();
        const currentIndex = screens.findIndex((screen) => screen.id === state.currentScreen);
        const nextIndex = currentIndex < screens.length - 1 ? currentIndex + 1 : 0;
        state.setCurrentScreen(screens[nextIndex].id);
      }

      if (event.key === '[' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const state = useCustomizationStore.getState();
        const currentIndex = screens.findIndex((screen) => screen.id === state.currentScreen);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : screens.length - 1;
        state.setCurrentScreen(screens[prevIndex].id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-background/90 backdrop-blur border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/img/klw.png" alt="KiplePay" width={120} height={32} className="h-8 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-foreground">KiplePay Mockup Builder</h1>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">By Products & Solutions Teams</p>
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 rounded">
                {process.env.NEXT_PUBLIC_GIT_HASH || 'dev'}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-full text-xs text-secondary-foreground">
            <Grid3X3 size={12} />
            {screens.length} screens
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary rounded-full text-xs text-secondary-foreground">
            <Layers size={12} />
            {selectedScreens.length} selected
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs">
            <Sparkles size={12} />
            Studio Mode
          </span>
          <span
            className="inline-flex items-center justify-center w-6 h-6 bg-secondary text-secondary-foreground rounded-full cursor-help hover:bg-secondary/80 transition-colors"
            title="Shortcuts:&#10;[  Previous Screen&#10;]  Next Screen&#10;⌘ K  Search"
          >
            <Keyboard size={12} />
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <Sidebar />
        <Preview screenRef={screenRef} />
        <ExportPanel
          onExportCurrent={handleExportCurrent}
          onExportSelected={handleExportSelected}
          onExportAll={handleExportAll}
          exportProgress={exportProgress}
        />
      </div>
    </div>
  );
}
