export const measureComponentPerformance = (componentName: string) => {
  if (typeof window !== "undefined" && "performance" in window) {
    performance.mark(`${componentName}-start`);

    return () => {
      performance.mark(`${componentName}-end`);
      performance.measure(
        `${componentName}`,
        `${componentName}-start`,
        `${componentName}-end`
      );

      const measure = performance.getEntriesByName(componentName)[0];
      if (measure && process.env.NODE_ENV === "development") {
        console.log(`[Performance] ${componentName}: ${measure.duration.toFixed(2)}ms`);
      }
    };
  }
  return () => {};
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};