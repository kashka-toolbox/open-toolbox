"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { CheckIcon } from "@radix-ui/react-icons"

const alertVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const possibleStatuses = ["unchecked", "checked", "progress"] as const;
type Status = typeof possibleStatuses[number];

const StatusIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
    status: Status
  }
>(({ className, variant, status, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertVariants({ variant }), "flex items-center space-x-2", className)}
    {...props}
  >
    <span className={`w-4 h-4 rounded-full border text-primary-foreground transition-all duration-200 flex items-center justify-center ${status == "checked" ? "bg-primary border-primary" : "border-border bg-primary-foreground"}`}>
    {
      status === "unchecked" ?
        null
      : status === "checked" ?
        <CheckIcon className="h-4 w-4 " />
      : status === "progress" ?
        <span className="w-3 h-3 rounded-full border-b-2 border-b-primary animate-spin" /> : null
    }
    </span>
    
    
    <span>
      {props.children}
    </span>
  </div>
))
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator }
