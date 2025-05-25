"use client";

import * as React from "react";
import { usePerformance } from "@/hooks/usePerformance";
import styles from "./Card.module.scss";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated" | "ghost" | "gradient";
  padding?: "none" | "sm" | "default" | "lg" | "xl";
  interactive?: boolean;
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "default", interactive = false, ...props }, ref) => {
    usePerformance("Card");
    
    const cardClasses = [
      styles.card,
      styles[variant],
      styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
      interactive && styles.interactive,
      className,
    ]
      .filter(Boolean)
      .join(" ");
    
    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.header, className].filter(Boolean).join(" ")}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={[styles.title, className].filter(Boolean).join(" ")}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={[styles.description, className].filter(Boolean).join(" ")}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={[styles.content, className].filter(Boolean).join(" ")} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.footer, className].filter(Boolean).join(" ")}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

const CardOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.overlay, className].filter(Boolean).join(" ")}
    {...props}
  />
));

CardOverlay.displayName = "CardOverlay";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardOverlay,
};