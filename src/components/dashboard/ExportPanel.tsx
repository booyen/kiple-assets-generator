'use client';

import { useState } from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { ScreenSelector } from './ScreenSelector';
import { ExportSettings } from './ExportSettings';
import { CheckSquare, Square, Navigation, Download, Layers3 } from 'lucide-react';

interface ExportPanelProps {
  onExportCurrent: () => Promise<void>;
  onExportSelected: () => Promise<void>;
  onExportAll: () => Promise<void>;
  exportProgress: string | null;
}

export function ExportPanel({
  onExportCurrent,
  onExportSelected,
  onExportAll,
  exportProgress,
}: ExportPanelProps) {
  const { selectedScreens, selectAllScreens, deselectAllScreens, currentScreen } = useCustomizationStore();
  const [activeTab, setActiveTab] = useState<'navigator' | 'export'>('navigator');

  const handleToggleAll = () => {
    if (selectedScreens.length > 0) {
      deselectAllScreens();
    } else {
      selectAllScreens();
    }
  };

  return (
    <div className="w-[360px] bg-background border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">Workspace</h2>
            <p className="text-xs text-muted-foreground">Current: <span className="font-medium text-foreground">{currentScreen}</span></p>
          </div>
          <button
            onClick={handleToggleAll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
          >
            {selectedScreens.length > 0 ? (
              <>
                <Square size={16} />
                Clear
              </>
            ) : (
              <>
                <CheckSquare size={16} />
                Select All
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-secondary p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('navigator')}
            className={`py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'navigator' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Navigation size={16} />
            Navigator
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${activeTab === 'export' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {activeTab === 'navigator' && (
        <>
          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Select Screens</h3>
              <p className="text-xs text-muted-foreground">{selectedScreens.length} selected</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-secondary rounded-full px-2 py-1">
              <Layers3 size={12} />
              Batch ready
            </span>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <ScreenSelector />
          </div>
        </>
      )}

      {activeTab === 'export' && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="rounded-xl border border-border p-3">
            <ExportSettings
              onExportCurrent={onExportCurrent}
              onExportSelected={onExportSelected}
              onExportAll={onExportAll}
              exportProgress={exportProgress}
            />
          </div>
        </div>
      )}
    </div>
  );
}
