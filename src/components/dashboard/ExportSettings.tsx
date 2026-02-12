'use client';

import { useState } from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { Download, Package, Loader2, ChevronDown, Smartphone, Monitor } from 'lucide-react';

interface ExportSettingsProps {
  onExportCurrent: () => Promise<void>;
  onExportSelected: () => Promise<void>;
  onExportAll: () => Promise<void>;
  exportProgress: string | null;
}

export function ExportSettings({
  onExportCurrent,
  onExportSelected,
  onExportAll,
  exportProgress,
}: ExportSettingsProps) {
  const {
    selectedScreens,
    includeDeviceFrame,
    setIncludeDeviceFrame,
    deviceType,
    setDeviceType,
    exportFormat,
    setExportFormat,
  } = useCustomizationStore();

  const [isExporting, setIsExporting] = useState(false);
  const [exportingType, setExportingType] = useState<'current' | 'selected' | 'all' | null>(null);

  const handleExport = async (type: 'current' | 'selected' | 'all', exportFn: () => Promise<void>) => {
    setIsExporting(true);
    setExportingType(type);
    try {
      await exportFn();
    } finally {
      setIsExporting(false);
      setExportingType(null);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Export progress */}
      {exportProgress && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-blue-700">{exportProgress}</span>
        </div>
      )}

      {/* Format selector */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setExportFormat('png')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            exportFormat === 'png'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          PNG
        </button>
        <button
          onClick={() => setExportFormat('jpeg')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            exportFormat === 'jpeg'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          JPEG
        </button>
      </div>

      {/* Device frame toggle */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setIncludeDeviceFrame(false)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
            !includeDeviceFrame
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Screen only"
        >
          <Monitor size={16} />
          <span>Screen</span>
        </button>
        <button
          onClick={() => setIncludeDeviceFrame(true)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
            includeDeviceFrame
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="With device frame"
        >
          <Smartphone size={16} />
          <span>Device</span>
        </button>
      </div>

      {/* Device type (only show when frame is enabled) */}
      {includeDeviceFrame && (
        <div className="relative">
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value as 'iphone' | 'android')}
            className="appearance-none pl-3 pr-8 py-2 text-sm bg-slate-100 border-0 rounded-lg font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="iphone">iPhone</option>
            <option value="android">Android</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>
      )}

      {/* Divider */}
      <div className="w-px h-8 bg-slate-200" />

      {/* Export buttons */}
      <button
        onClick={() => handleExport('current', onExportCurrent)}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        title="Download current screen"
      >
        {exportingType === 'current' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Download size={16} />
        )}
        Current
      </button>

      <button
        onClick={() => handleExport('selected', onExportSelected)}
        disabled={isExporting || selectedScreens.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        title="Download selected screens as ZIP"
      >
        {exportingType === 'selected' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Package size={16} />
        )}
        Selected ({selectedScreens.length})
      </button>

      <button
        onClick={() => handleExport('all', onExportAll)}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        title="Download all screens as ZIP"
      >
        {exportingType === 'all' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Package size={16} />
        )}
        All
      </button>
    </div>
  );
}
