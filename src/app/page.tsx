'use client';

import { useRef, useCallback, useState } from 'react';
import { Sidebar, Preview, ExportPanel, ExportSettings } from '@/components/dashboard';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { screens } from '@/components/screens';
import { DeviceFrame } from '@/components/ui';
import { downloadElement, generateFilename, exportElement } from '@/lib/exportImage';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function Dashboard() {
  const screenRef = useRef<HTMLDivElement>(null);
  const { currentScreen, selectedScreens, exportFormat, includeDeviceFrame, deviceType } = useCustomizationStore();
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

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/img/klw.png" alt="KiplePay" className="h-8 w-auto" />
          <div>
            <h1 className="text-lg font-bold text-slate-900">KiplePay Mockup Builder</h1>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500">Sep Produk buat ni deh</p>
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded">v1.0.0</span>
            </div>
          </div>
        </div>

        {/* Export settings in header */}
        <ExportSettings
          onExportCurrent={handleExportCurrent}
          onExportSelected={handleExportSelected}
          onExportAll={handleExportAll}
          exportProgress={exportProgress}
        />
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Preview screenRef={screenRef} />
        <ExportPanel />
      </div>
    </div>
  );
}
