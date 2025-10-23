"use client";

import { ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
