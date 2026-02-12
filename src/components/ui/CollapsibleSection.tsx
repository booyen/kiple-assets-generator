'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 transition-colors"
      >
        {/* Chevron */}
        <span className="text-slate-400">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>

        {/* Icon */}
        {icon && <span className="text-slate-500">{icon}</span>}

        {/* Title */}
        <span className="flex-1 text-left text-sm font-medium text-slate-700">
          {title}
        </span>

        {/* Badge */}
        {badge !== undefined && (
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
            {badge}
          </span>
        )}
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-3 pb-5 pt-1 border-t border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
}
