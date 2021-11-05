import { useEffect, useLayoutEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const refCallback = useRef(callback);

  useLayoutEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay) {
      return;
    }

    const timer = setInterval(() => refCallback.current(), delay);
    return () => clearTimeout(timer);
  });
}
