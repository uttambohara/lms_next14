"use client";

import { useEffect, useState } from "react";

type DebounceProps = {
  input: string;
  delay?: number;
};

export default function useDebounce({ input, delay }: DebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(input);
    }, delay || 1500);

    return () => clearTimeout(timer);
  }, [input]);

  return debouncedValue;
}
