"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "./CTAComponent";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CTABlock({
  image,
  heading,
  subheading,
  ctabuttons,
}: any) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    const trigger = gsap.fromTo(
      el,
      { scale: 0.9, opacity: 1 },
      {
        scale: 1,
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      trigger.scrollTrigger?.kill(); // Proper cleanup
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="cta-card w-full relative gradient rounded-2xl flex items-center py-8 overflow-hidden"
    >
      <img
        src={image}
        alt=""
        className="absolute right-0 h-full object-cover"
      />

      <div className="p-10 sm:p-20">
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl sm:text-4xl text-white mb-3">{heading}</h2>
          <p className="text-white">{subheading}</p>

          <div className="mt-8">
            {ctabuttons.map((item: any) => (
              <CTAButton
                key={item.system.id}
                variant={item.elements.variant.value[0]?.name}
                buttonname={item.elements.name?.value}
                buttonlink={item.elements.link?.value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
