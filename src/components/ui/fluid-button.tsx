'use client';

import React from 'react';
import { HeroButton } from '@/components/ui/hero-button';

export interface FluidButtonProps {
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  text?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: "dark" | "cyan" | "white" | "hero";
  ariaLabel?: string;
}

export function FluidButton({
  href,
  target,
  rel,
  onClick,
  type = "button",
  disabled = false,
  text,
  children,
  className = "",
  ariaLabel
}: FluidButtonProps) {
  return (
    <HeroButton
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      type={type}
      disabled={disabled}
      ariaLabel={ariaLabel}
      className={className}
      text={text || children}
    />
  );
}
