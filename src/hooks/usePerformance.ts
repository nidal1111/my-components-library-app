import { useEffect, useRef } from "react";
import { measureComponentPerformance } from "@/utils/performance";

export const usePerformance = (componentName: string, enabled = true) => {
  const measureEndRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    measureEndRef.current = measureComponentPerformance(componentName);

    return () => {
      if (measureEndRef.current) {
        measureEndRef.current();
      }
    };
  }, [componentName, enabled]);

  const markEvent = (eventName: string) => {
    if (!enabled || typeof window === "undefined") return;
    
    performance.mark(`${componentName}-${eventName}`);
  };

  const measureEvent = (eventName: string, startMark?: string) => {
    if (!enabled || typeof window === "undefined") return;

    const endMark = `${componentName}-${eventName}-end`;
    const start = startMark || `${componentName}-${eventName}`;
    
    performance.mark(endMark);
    performance.measure(`${componentName}-${eventName}`, start, endMark);
  };

  return { markEvent, measureEvent };
};

export const useRenderCount = (componentName: string) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    if (process.env.NODE_ENV === "development") {
      console.log(`[RenderCount] ${componentName}: ${renderCount.current}`);
    }
  });

  return renderCount.current;
};