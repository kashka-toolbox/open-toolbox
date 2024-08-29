import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"


const sectionVariants = cva(
  "border rounded-md border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 md:p-4",
  {
    variants: {
      variant: {
        default: "",
        hoverFading: "text-primary/80 hover:text-primary transition-colors duration-200",
        primary: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & VariantProps<typeof sectionVariants>
>(({ className, variant, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      sectionVariants({ variant }),
      className
    )}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }