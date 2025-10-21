import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";
import Link from "next/link";
import React from "react";

export default async function page() {
  const { data } = await deliveryClient
    .item("pillars_page___tycoons")
    .depthParameter(2)
    .toPromise();

  const pageData = data.item.elements as any;
  return (
    <div>
      <div className="">
        <div className=" w-full relative   rounded-2xl flex items-center py-8">
          <img
            src={pageData.bannerimage.value[0]?.url}
            alt=""
            className="absolute inset-0 w-full  h-full object-cover"
          />

          <div className="p-10 sm:p-20 container mx-auto">
            <div className="relative z-10 ">
              <div className="grid sm:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl sm:text-6xl text-white mb-3">
                    {pageData.bannerheading.value}
                  </h2>
                </div>

                <div>
                  <div
                    className="prose max-w-none text-white"
                    dangerouslySetInnerHTML={{
                      __html: pageData.aboutcontent.value,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Section>
          <div className="">
            <div>
              <div>
                {pageData.pillaritems.linkedItems.map(
                  (item: any, index: number) => {
                    const isReversed = index % 2 !== 0; // Reverse on odd items

                    return (
                      <div key={item.system.id} className="mb-16">
                        <div
                          className={`flex flex-col sm:flex-row gap-10 items-center ${
                            isReversed ? "sm:flex-row-reverse" : ""
                          }`}
                        >
                          {/* Text Section */}
                          <div className="sm:w-1/2 p-5 sm:p-30">
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

                          {/* Image Section */}
                          <div className="sm:w-1/2">
                            <img
                              src={item.elements.image.value[0]?.url}
                              alt={item.elements.image.value[0]?.name}
                              className={`w-full object-cover aspect-square ${
                                isReversed
                                  ? "sm:rounded-r-xl"
                                  : "sm:rounded-l-xl"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
