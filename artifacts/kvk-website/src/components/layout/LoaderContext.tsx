import { createContext, useContext, useState, ReactNode } from "react";

type LoaderContextType = {
  isLoaderDone: boolean;
  setLoaderDone: (done: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoaderDone, setLoaderDone] = useState(false);
  return (
    <LoaderContext.Provider value={{ isLoaderDone, setLoaderDone }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
