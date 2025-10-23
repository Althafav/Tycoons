// components/PillarItemsAnimated.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

export default function PillarItemsAnimated({ items }: { items: any[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLDivElement>("[data-pillar-row]");
      rows.forEach((row) => {
        const isReversed = row.dataset.reverse === "true";
        const textEl = row.querySelector<HTMLElement>("[data-pillar-text]")!;
        const imgEl = row.querySelector<HTMLElement>("[data-pillar-image]")!;

        const xFrom = isReversed ? 40 : -40; // slide in from left/right for text
        const imgFrom = isReversed ? -40 : 40; // opposite side for image

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            end: "top 30%",
            scrub: true, // tie to scroll; set to false if you want a play-once
            once: false, // change to true if you want it only the first time
          },
          defaults: { ease: "power2", duration: 0.6 },
        });

        tl.fromTo(
          textEl,
          { autoAlpha: 0, y: 24, x: xFrom },
          { autoAlpha: 1, y: 0, x: 0 }
        ).fromTo(
          imgEl,
          { autoAlpha: 0.7, scale: 0.95, x: imgFrom },
          { autoAlpha: 1, scale: 1, x: 0 },
          "<+0.20"
        );
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef}>
      {items.map((item: any, index: number) => {
        const isReversed = index % 2 !== 0;
        return (
          <div key={item.system.id} className="mb-16">
            <div
              data-pillar-row
              data-reverse={isReversed}
              className={`flex flex-col sm:flex-row gap-10 items-center ${
                isReversed ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div data-pillar-text className="sm:w-1/2 p-5 sm:p-30">
                <h2 className="text-3xl sm:text-5xl text-primary mb-4">
                  {item.elements.name.value}
                </h2>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: item.elements.content.value,
                  }}
                />
                <div className="mt-8">
                  <Link
                    href={item.elements.ctalink.value}
                    className="underline text-primary text-xl flex gap-2 items-center"
                  >
                    {item.elements.ctaname.value}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                    >
                      <circle
                        cx="19.0703"
                        cy="18.6775"
                        r="18.6775"
                        fill="#BC9841"
                      />
                      <path
                        d="M28.9274 19.1952C29.2134 18.9091 29.2134 18.4454 28.9274 18.1593L24.266 13.4979C23.9799 13.2119 23.5162 13.2119 23.2301 13.4979C22.9441 13.784 22.9441 14.2478 23.2301 14.5338L27.3736 18.6772L23.2301 22.8207C22.9441 23.1067 22.9441 23.5705 23.2301 23.8566C23.5162 24.1426 23.9799 24.1426 24.266 23.8566L28.9274 19.1952ZM9.73169 18.6772V19.4097H28.4094V18.6772V17.9448H9.73169V18.6772Z"
                        fill="black"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div data-pillar-image className="sm:w-1/2">
                <img
                  src={item.elements.image.value[0]?.url}
                  alt={item.elements.image.value[0]?.name}
                  className={`w-full object-cover aspect-square ${
                    isReversed ? "sm:rounded-r-full" : "sm:rounded-l-full"
                  }`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
