import { useContext } from "react";
import { FPLContext } from "../context/FPLContext";
import type { FPLContextType } from "../context/FPLContext";

export default function useFPL(): FPLContextType {
  const context = useContext(FPLContext);

  if (!context) {
    throw new Error("useFPL must be used within an FPLProvider");
  }

  return context;
}
