'use client';

import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';

interface CollapsibleSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
  open,
  onOpenChange,
}: CollapsibleSectionProps) {
  return (
    <Collapsible
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      className="border border-border rounded-xl bg-card text-card-foreground overflow-hidden"
    >
      <CollapsibleTrigger asChild>
        <button
          className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 transition-colors group"
        >
          <span className="text-muted-foreground">
            <ChevronRight size={16} className="transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </span>

          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="flex-1 text-left text-sm font-medium">
            {title}
          </span>

          {badge !== undefined && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground rounded">
              {badge}
            </span>
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
        <div className="px-3 py-4 border-t border-border">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
