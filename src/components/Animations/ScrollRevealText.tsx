"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ScrollRevealText.module.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  content: string;
  startColor?: string;
  endColor?: string;
};

export default function ScrollRevealText({
  content,
  startColor = "#000000",
  endColor = "#d5d5d5",
}: Props) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Select headings, paragraphs, lists inside our scope
      const targets = gsap.utils.toArray<HTMLElement>(
        scope.current!.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li")
      );

      targets.forEach((el) => {
        el.classList.add(styles.textSweep);

        // Set per-element CSS variables (no global CSS injection)
        gsap.set(el, {
          "--start-color": startColor,
          "--end-color": endColor,
          backgroundPositionX: "100%",
        } as any);

        // Animate the sweep with ScrollTrigger
        gsap.to(el, {
          backgroundPositionX: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
        });
      });
    },
    { scope, dependencies: [content, startColor, endColor] } // rerun if content/colors change
  );

  return (
    <div
      ref={scope}
      className="prose max-w-4xl text-xl"
      // content is expected to be sanitized before passing in
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
