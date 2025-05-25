"use client";

import * as React from "react";
import { usePerformance } from "@/hooks/usePerformance";
import styles from "./Input.module.scss";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  inputSize?: "sm" | "default" | "lg" | "xl";
  state?: "default" | "error" | "success";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      inputSize = "default",
      state: stateProp,
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      error,
      success,
      helperText,
      label,
      required,
      id,
      ...props
    },
    ref
  ) => {
    usePerformance("Input");
    
    const inputId = id || React.useId();
    const state = error ? "error" : success ? "success" : stateProp || "default";
    
    const inputClasses = [
      styles.input,
      inputSize !== "default" && styles[inputSize],
      state !== "default" && styles[state],
      leftIcon && styles.withLeftIcon,
      rightIcon && styles.withRightIcon,
      className,
    ]
      .filter(Boolean)
      .join(" ");
    
    const inputElement = (
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        id={inputId}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
    );

    const inputWithIcons = leftIcon || rightIcon ? (
      <div className={styles.inputContainer}>
        {leftIcon && (
          <div className={styles.leftIcon}>
            {leftIcon}
          </div>
        )}
        {inputElement}
        {rightIcon && (
          <div className={styles.rightIcon}>
            {rightIcon}
          </div>
        )}
      </div>
    ) : inputElement;

    const inputWithAddons = leftAddon || rightAddon ? (
      <div className={styles.addonContainer}>
        {leftAddon && (
          <div className={styles.leftAddon}>
            {leftAddon}
          </div>
        )}
        {inputWithIcons}
        {rightAddon && (
          <div className={styles.rightAddon}>
            {rightAddon}
          </div>
        )}
      </div>
    ) : inputWithIcons;

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label
            htmlFor={inputId}
            className={styles.label}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        {inputWithAddons}
        {helperText && (
          <p
            id={`${inputId}-helper`}
            className={[
              styles.helperText,
              error && styles.errorText,
              success && styles.successText,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };