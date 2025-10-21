import React from "react";
import CTAButton from "./CTAComponent";

export default function CTABlock({
  image,
  heading,
  subheading,
  ctabuttons,
}: any) {
  return (
    <div className="">
      <div className="cta-card w-full relative gradient  rounded-2xl flex items-center py-8">
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
              {ctabuttons.map((item: any) => {
                console.log(item.elements.variant.value[0]?.name);
                return (
                  <CTAButton
                    key={item.system.id}
                    variant={item.elements.variant.value[0]?.name}
                    buttonname={item.elements.name?.value}
                    buttonlink={item.elements.link?.value}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
