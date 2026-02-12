'use client';

import { useCustomizationStore } from '@/store/useCustomizationStore';
import { ScreenSelector } from './ScreenSelector';
import { CheckSquare, Square } from 'lucide-react';

export function ExportPanel() {
  const { selectedScreens, selectAllScreens, deselectAllScreens } = useCustomizationStore();

  const handleToggleAll = () => {
    if (selectedScreens.length > 0) {
      deselectAllScreens();
    } else {
      selectAllScreens();
    }
  };

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Select Screens</h2>
          <p className="text-sm text-slate-500">{selectedScreens.length} selected</p>
        </div>
        <button
          onClick={handleToggleAll}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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

      {/* Screen selector - takes full remaining space */}
      <div className="flex-1 overflow-y-auto p-4">
        <ScreenSelector />
      </div>
    </div>
  );
}
