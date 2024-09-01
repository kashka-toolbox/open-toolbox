import * as React from "react"

import { cn } from "@/lib/utils"
import { CopyToClipboard } from "./copyToClipboard"

export interface TranslationTableProps
  extends React.HTMLAttributes<HTMLElement> {}

const TranslationTable = React.forwardRef<HTMLDivElement, TranslationTableProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid auto-fill-24 auto-rows-max gap-[1px] w-full",
          className
        )}
        {...props}
      />
    )
  }
)
TranslationTable.displayName = "TranslationTable"

export interface TranslationTableItemProps
  extends React.HTMLAttributes<HTMLElement> {
    untranslated: string,
    translated: string,
  }

const TranslationTableItem = React.forwardRef<HTMLDivElement, TranslationTableItemProps>(
  ({ className, untranslated, translated, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col justify-around px-4 py-2 outline-border-border gap-2 aspect-square",
          className
        )}
        {...props}
      >
        <span className="flex flex-row items-end gap-1 justify-center">
          {untranslated}
          <CopyToClipboard clipboardContent={untranslated} className="text-muted-foreground" />
        </span>
        <span className="flex flex-row items-end gap-1 font-semibold justify-center">
          {translated}
          <CopyToClipboard clipboardContent={translated} className="text-muted-foreground" />
        </span>
      </div>
    )
  }
)
TranslationTableItem.displayName = "TranslationTableItem"

export { TranslationTable, TranslationTableItem }
