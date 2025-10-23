// components/PillarItemsAnimated.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function PillarItemsAnimated({ items }: { items: any[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLDivElement>('[data-pillar-row]');
      rows.forEach((row) => {
        const isReversed = row.dataset.reverse === "true";
        const textEl  = row.querySelector<HTMLElement>('[data-pillar-text]')!;
        const imgEl   = row.querySelector<HTMLElement>('[data-pillar-image]')!;

        const xFrom = isReversed ? 40 : -40;   // slide in from left/right for text
        const imgFrom = isReversed ? -40 : 40; // opposite side for image

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            end: "top 30%",
            scrub: true,     // tie to scroll; set to false if you want a play-once
            once: false,     // change to true if you want it only the first time
          },
          defaults: { ease: "power2.out", duration: 0.6 }
        });

        tl.fromTo(textEl, { autoAlpha: 0, y: 24, x: xFrom },
                           { autoAlpha: 1, y: 0,   x: 0 })
          .fromTo(imgEl,  { autoAlpha: 0.7, scale: 0.95, x: imgFrom },
                           { autoAlpha: 1, scale: 1,    x: 0 }, "<+0.20");
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
              className={`flex flex-col sm:flex-row gap-10 items-center ${isReversed ? "sm:flex-row-reverse" : ""}`}
            >
              {/* Text */}
              <div data-pillar-text className="sm:w-1/2 p-5 sm:p-30">
                <h2 className="text-3xl sm:text-5xl text-primary mb-4">
                  {item.elements.name.value}
                </h2>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: item.elements.content.value }}
                />
                <div className="mt-8">
                  <a
                    href={item.elements.ctalink.value}
                    className="underline text-primary text-xl flex gap-2 items-center"
                  >
                    {item.elements.ctaname.value}
                    {/* your svg arrow unchanged */}
                  </a>
                </div>
              </div>

              {/* Image */}
              <div data-pillar-image className="sm:w-1/2">
                <img
                  src={item.elements.image.value[0]?.url}
                  alt={item.elements.image.value[0]?.name}
                  className={`w-full object-cover aspect-square ${isReversed ? "sm:rounded-r-full" : "sm:rounded-l-full"}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
