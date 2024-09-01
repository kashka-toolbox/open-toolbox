import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"


const sectionVariants = cva(
  "border border-border rounded-md p-2 md:p-4",
  {
    variants: {
      variant: {
        default: "",
        ghost: "bg-transparent border-transparent",
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