import React from "react";
import SplitText from "../Animations/SplitText";

export default function Heading2({ children, className }: any) {
  return (
    <SplitText
      text={children}
      as="h2"
      className={` text-2xl sm:text-3xl font-semibold tracking-tight mb-3 ${className}`}
    />
  );
}
