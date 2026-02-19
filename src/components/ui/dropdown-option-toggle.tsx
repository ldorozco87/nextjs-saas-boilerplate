"use client";

import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type DropdownOption<T> = {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
};

type Props<T> = {
  trigger: ReactNode;
  ariaLabel: string;
  options: DropdownOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** Stable id for the menu root and trigger to avoid hydration mismatch (Radix useId). */
  menuId?: string;
};

export function DropdownOptionToggle<T extends string>({
  trigger,
  ariaLabel,
  options,
  value,
  onValueChange,
  menuId,
}: Props<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={ariaLabel}
          id={menuId ? `${menuId}-trigger` : undefined}
          suppressHydrationWarning
        >
          {trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => onValueChange(opt.value)}
            className={value === opt.value ? "bg-accent" : undefined}
          >
            {opt.icon != null ? (
              <span className="mr-2 [&>svg]:size-4">{opt.icon}</span>
            ) : null}
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
