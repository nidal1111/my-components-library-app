import { useEffect, useState, useCallback, useRef } from "react";
import { announceToScreenReader, trapFocus } from "@/utils/accessibility";

export const useAccessibility = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  useEffect(() => {
    const mediaQueryMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaQueryContrast = window.matchMedia("(prefers-contrast: high)");

    setReduceMotion(mediaQueryMotion.matches);
    setHighContrast(mediaQueryContrast.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setKeyboardNavigation(true);
      }
    };

    const handleMouseDown = () => {
      setKeyboardNavigation(false);
    };

    mediaQueryMotion.addEventListener("change", handleMotionChange);
    mediaQueryContrast.addEventListener("change", handleContrastChange);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      mediaQueryMotion.removeEventListener("change", handleMotionChange);
      mediaQueryContrast.removeEventListener("change", handleContrastChange);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const announce = useCallback((message: string, priority?: "polite" | "assertive") => {
    announceToScreenReader(message, priority);
  }, []);

  return {
    reduceMotion,
    highContrast,
    keyboardNavigation,
    announce,
  };
};

export const useFocusTrap = (enabled = true) => {
  const containerRef = useRef<HTMLElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    cleanupRef.current = trapFocus(containerRef.current);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [enabled]);

  return containerRef;
};

export const useAriaLive = (message: string, priority: "polite" | "assertive" = "polite") => {
  useEffect(() => {
    if (message) {
      announceToScreenReader(message, priority);
    }
  }, [message, priority]);
};