import { cn } from '@/lib/utils';
import React from 'react';

export const Logo = React.forwardRef<
React.ElementRef<"div">,
React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "bg-warning-foreground",
      className
    )}
    ref={ref}
    {...props} />
));
Logo.displayName = 'Logo';