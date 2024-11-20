import { cn } from '@/lib/utils';
import React from 'react';
import FourDotsSvg from "./4Dots.svg"
import Image from 'next/image';

export const FourDotsIcon: React.FunctionComponent<Partial<React.ComponentPropsWithoutRef<typeof Image>>> = (({ className, ...props }) => (
  <Image
    className={cn(
      "",
      className
    )}
    priority
    {...props}
    src={FourDotsSvg}
    alt="FourDotsIcon"
  />

));
FourDotsIcon.displayName = 'FourDotsIcon';