import { cn } from '@/lib/utils';
import React from 'react';
import ToolBoxLogo from "./toolbox-logo-placeholder.svg"
import Image from 'next/image';

export const ToolboxLogo: React.FunctionComponent<Partial<React.ComponentPropsWithoutRef<typeof Image>>> = (({ className, ...props }) => (
  <Image
    className={cn(
      "dark:invert",
      className
    )}
    priority
    {...props}
    src={ToolBoxLogo}
    alt="Toolbox Logo"
  />

));
ToolboxLogo.displayName = 'Logo';