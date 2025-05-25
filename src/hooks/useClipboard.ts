import { useState, useCallback } from "react";

interface UseClipboardOptions {
  timeout?: number;
  onSuccess?: (text: string) => void;
  onError?: (error: Error) => void;
}

export const useClipboard = (options: UseClipboardOptions = {}) => {
  const { timeout = 2000, onSuccess, onError } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (!navigator?.clipboard) {
        throw new Error("Clipboard API not available");
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      onSuccess?.(text);

      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to copy");
      setError(error);
      setCopied(false);
      onError?.(error);
    }
  }, [timeout, onSuccess, onError]);

  const readFromClipboard = useCallback(async () => {
    try {
      if (!navigator?.clipboard) {
        throw new Error("Clipboard API not available");
      }

      const text = await navigator.clipboard.readText();
      return text;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to read clipboard");
      setError(error);
      onError?.(error);
      return null;
    }
  }, [onError]);

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
  }, []);

  return {
    copied,
    error,
    copyToClipboard,
    readFromClipboard,
    reset,
  };
};