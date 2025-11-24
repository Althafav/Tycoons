import Link from "next/link";
import React from "react";
import CTAButton from "./Blocks/CTAComponent";
import SplitText from "./Animations/SplitText";

export default function HeroSection({
  heading,
  subheading,
  bannerimage,
  bannervideo,
  ctabuttons,
}: any) {
  return (
    <div className="relative w-full h-[90vh] flex flex-col justify-center items-start text-start text-white overflow-hidden">
      {/* Background Video */}
      {bannervideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={bannervideo}
          poster={bannerimage}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerimage})` }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <SplitText
          text={heading}
          as="h1"
          className={`text-3xl sm:text-5xl font-bold mb-4`}
        />
        <p className="text-lg">{subheading}</p>

        {ctabuttons && (
          <div className="mt-8">
            {ctabuttons.map((item: any) => {
              return (
                <CTAButton
                  key={item.system.id}
                  variant={item.elements.variant.value[0].name}
                  buttonname={item.elements.name.value}
                  buttonlink={item.elements.link.value}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
