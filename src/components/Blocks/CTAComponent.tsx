import Link from "next/link";
import React from "react";

type CTAButtonProps = {
  buttonname: string;
  buttonlink?: string;
  target?: "_self" | "_blank";
  variant?: "primary" | "secondary"; // New prop
};

export default function CTAButton({
  buttonname,
  buttonlink = "#",
  target = "_self",
  variant = "primary",
}: CTAButtonProps) {
  const baseStyles =
    "px-6 py-3 font-semibold rounded-full transition";

  const variants = {
    primary: "bg-primary hover:bg-primaryDark text-white",
    secondary: "bg-secondary hover:bg-secondaryDark text-white",
  };

  return (
    <Link
      target={target}
      href={buttonlink}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {buttonname}
    </Link>
  );
}
