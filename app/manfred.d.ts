declare global {
  interface Window {
    manfred?: (
      name: string,
      options?: { props?: Record<string, unknown> },
    ) => void;
  }
}

export {};
