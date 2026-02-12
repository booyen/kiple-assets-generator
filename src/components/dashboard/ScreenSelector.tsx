'use client';

import { useState, useMemo } from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { screens, getScreensByCategory } from '@/components/screens';
import { Check, ChevronRight, ChevronDown, Folder, FolderOpen, FileImage, Search, X } from 'lucide-react';

const categories = [
  { id: 'splash', label: 'Splash & Welcome', icon: '🚀' },
  { id: 'onboarding', label: 'Onboarding', icon: '📱' },
  { id: 'auth', label: 'Authentication', icon: '🔐' },
  { id: 'ekyc', label: 'eKYC Verification', icon: '🪪' },
  { id: 'home', label: 'Home Screen', icon: '🏠' },
] as const;

export function ScreenSelector() {
  const {
    selectedScreens,
    toggleScreen,
    currentScreen,
    setCurrentScreen,
  } = useCustomizationStore();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Track expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map(c => c.id)) // All expanded by default
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const toggleCategorySelection = (categoryId: string) => {
    const categoryScreens = getScreensByCategory(categoryId as typeof categories[number]['id']);
    const categoryScreenIds = categoryScreens.map(s => s.id);
    const allSelected = categoryScreenIds.every(id => selectedScreens.includes(id));

    if (allSelected) {
      // Deselect all in category
      categoryScreenIds.forEach(id => {
        if (selectedScreens.includes(id)) {
          toggleScreen(id);
        }
      });
    } else {
      // Select all in category
      categoryScreenIds.forEach(id => {
        if (!selectedScreens.includes(id)) {
          toggleScreen(id);
        }
      });
    }
  };

  // Filter screens based on search query
  const filteredScreens = useMemo(() => {
    if (!searchQuery.trim()) {
      return null; // Show all
    }
    const query = searchQuery.toLowerCase();
    return screens.filter(screen =>
      screen.name.toLowerCase().includes(query) ||
      screen.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-2">
      {/* Search input */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search screens..."
          className="w-full pl-9 pr-9 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search results or category view */}
      {filteredScreens ? (
        // Search results view
        <div className="space-y-0.5">
          {filteredScreens.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No screens found
            </div>
          ) : (
            filteredScreens.map((screen) => {
              const isSelected = selectedScreens.includes(screen.id);
              const isCurrent = currentScreen === screen.id;

              return (
                <div
                  key={screen.id}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {/* Screen checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleScreen(screen.id);
                    }}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {isSelected && <Check size={10} strokeWidth={3} />}
                  </button>

                  {/* File icon */}
                  <FileImage size={14} className={isCurrent ? 'text-blue-500' : 'text-slate-400'} />

                  {/* Screen name */}
                  <button
                    onClick={() => setCurrentScreen(screen.id)}
                    className="flex-1 text-left text-sm truncate"
                  >
                    {screen.name}
                  </button>

                  {/* Category badge */}
                  <span className="text-xs text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
                    {categories.find(c => c.id === screen.category)?.label}
                  </span>

                  {/* Current indicator */}
                  {isCurrent && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        // Category view
        <div className="space-y-1">
          {categories.map((category) => {
        const categoryScreens = getScreensByCategory(category.id);
        const selectedInCategory = categoryScreens.filter((s) =>
          selectedScreens.includes(s.id)
        ).length;
        const isExpanded = expandedCategories.has(category.id);
        const allSelected = selectedInCategory === categoryScreens.length;
        const someSelected = selectedInCategory > 0 && selectedInCategory < categoryScreens.length;

        return (
          <div key={category.id} className="select-none">
            {/* Category header */}
            <div
              className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-50 ${
                isExpanded ? 'bg-slate-50' : ''
              }`}
            >
              {/* Expand/collapse toggle */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-center w-5 h-5 text-slate-400 hover:text-slate-600"
              >
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {/* Category checkbox */}
              <button
                onClick={() => toggleCategorySelection(category.id)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  allSelected
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : someSelected
                    ? 'bg-blue-100 border-blue-400'
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}
              >
                {allSelected && <Check size={10} strokeWidth={3} />}
                {someSelected && <div className="w-2 h-0.5 bg-blue-500 rounded" />}
              </button>

              {/* Folder icon */}
              <span className="text-sm">
                {isExpanded ? <FolderOpen size={16} className="text-amber-500" /> : <Folder size={16} className="text-amber-500" />}
              </span>

              {/* Category label */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex-1 text-left"
              >
                <span className="text-sm font-medium text-slate-700">
                  {category.label}
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  ({selectedInCategory}/{categoryScreens.length})
                </span>
              </button>
            </div>

            {/* Screen items */}
            {isExpanded && (
              <div className="ml-5 border-l border-slate-200 pl-2 mt-1 mb-2 space-y-0.5">
                {categoryScreens.map((screen, index) => {
                  const isSelected = selectedScreens.includes(screen.id);
                  const isCurrent = currentScreen === screen.id;
                  const isLast = index === categoryScreens.length - 1;

                  return (
                    <div
                      key={screen.id}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                        isCurrent
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {/* Tree connector line */}
                      <div className="relative w-3 h-full">
                        <div className={`absolute left-0 top-1/2 w-3 h-px bg-slate-200`} />
                      </div>

                      {/* Screen checkbox */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleScreen(screen.id);
                        }}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <Check size={10} strokeWidth={3} />}
                      </button>

                      {/* File icon */}
                      <FileImage size={14} className={isCurrent ? 'text-blue-500' : 'text-slate-400'} />

                      {/* Screen name */}
                      <button
                        onClick={() => setCurrentScreen(screen.id)}
                        className="flex-1 text-left text-sm truncate"
                      >
                        {screen.name}
                      </button>

                      {/* Current indicator */}
                      {isCurrent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
        </div>
      )}
    </div>
  );
}
