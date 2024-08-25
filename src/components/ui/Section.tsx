import * as React from "react"

import { cn } from "@/lib/utils"

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "border rounded-md border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 md:p-4",
      className
    )}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }