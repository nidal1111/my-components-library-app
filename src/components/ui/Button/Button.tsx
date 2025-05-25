"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  fullWidth?: boolean;
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      fullWidth = false,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.button,
      styles[variant],
      size !== "default" && styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (asChild) {
      return (
        <Slot
          className={classes}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    const { 'aria-label': originalAriaLabel, ...restProps } = props;
    const ariaLabel = loading 
      ? `${originalAriaLabel || (typeof children === 'string' ? children : 'Button')} - Loading` 
      : originalAriaLabel;
    
    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-label={ariaLabel}
        {...restProps}
      >
        {loading && <span className="sr-only">Loading</span>}
        {!loading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {!loading && children}
        {!loading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };