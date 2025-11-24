import React from "react";
import CTAButton from "./CTAComponent";
import Section from "../UI/Section";
import SplitText from "../Animations/SplitText";

export default function CTABlock2({
  backgroundimage,
  heading,
  subheading,
  ctabutton,
}: any) {
  return (
    <Section>
      <div
        className="relative py-12 sm:py-40 overflow-hidden bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundimage})`,
        }}
      >
        <div className="container mx-auto">
          <div className="relative max-w-4xl mx-auto z-10">
            <SplitText
              text={heading}
              as="h2"
              className={`text-2xl sm:text-4xl text-white text-center`}
            />

            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              {ctabutton.map((item: any) => {
                return (
                  <CTAButton
                    key={item.system.id}
                    variant="primary"
                    buttonname={item.elements.name.value}
                    buttonlink={item.elements.link.value}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
