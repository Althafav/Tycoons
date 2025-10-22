import CTABlock from "@/components/Blocks/CTABlock";
import Heading2 from "@/components/UI/Heading2";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_NAME, SITE_URL } from "@/modules/Globals";
import Link from "next/link";
import React from "react";


export async function generateMetadata() {
  const { data } = await deliveryClient
    .item("home_page___tycoons")
    .depthParameter(2)
    .toPromise();

  const pageData = data.item.elements as any;

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${SITE_URL}about`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${SITE_URL}about`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}assets/logos/tycoons-thumbnail.png`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      images: [`${SITE_URL}assets/logos/tycoons-thumbnail.png`],
    },
  };
}

export default async function page() {
  const { data } = await deliveryClient
    .item("about_page_tycoon")
    .depthParameter(2)
    .toPromise();

  const pageData = data.item.elements as any;
  return (
    <div>
      <div className="relative py-12 sm:py-16 flex justify-center items-center">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="w-full h-full absolute inset-0 object-cover"
        />

        <div className="container">
          <div className="relative z-10 pt-20 ">
            <div className="grid sm:grid-cols-12 gap-5">
              <div className="col-span-2">
                <h1 className="text-4xl sm:text-5xl text-primary">
                  {pageData.missionheading.value}
                </h1>
              </div>

              <div className="col-span-10">
                <div
                  className="text-white prose max-w-none mt-10 text-lg"
                  dangerouslySetInnerHTML={{
                    __html: pageData.missioncontent.value,
                  }}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-12 gap-5 mt-10">
              <div className="col-span-2">
                <h1 className="text-4xl sm:text-5xl text-primary">
                  {pageData.visionheading.value}
                </h1>
              </div>

              <div className="col-span-10">
                <div
                  className="text-white prose max-w-none mt-10 text-lg"
                  dangerouslySetInnerHTML={{
                    __html: pageData.visioncontent.value,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <Heading2 className="text-center mb-8">
            {pageData.objectivesheading.value}
          </Heading2>

          <div className="grid sm:grid-cols-3 gap-5">
            {pageData.objectiveitems.linkedItems.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="shadow-xl p-10 rounded-3xl"
                >
                  <h4 className="text-primary text-2xl mb-3 max-w-[220px]">
                    {item.elements.name.value}
                  </h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.elements.content.value,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href={pageData.objectivesctalink.value}
              className="underline text-primary text-xl flex gap-2 items-center"
            >
              {pageData.objectivesctaname.value}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
              >
                <circle cx="19.0703" cy="18.6775" r="18.6775" fill="#BC9841" />
                <path
                  d="M28.9274 19.1952C29.2134 18.9091 29.2134 18.4454 28.9274 18.1593L24.266 13.4979C23.9799 13.2119 23.5162 13.2119 23.2301 13.4979C22.9441 13.784 22.9441 14.2478 23.2301 14.5338L27.3736 18.6772L23.2301 22.8207C22.9441 23.1067 22.9441 23.5705 23.2301 23.8566C23.5162 24.1426 23.9799 24.1426 24.266 23.8566L28.9274 19.1952ZM9.73169 18.6772V19.4097H28.4094V18.6772V17.9448H9.73169V18.6772Z"
                  fill="black"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          {pageData.ctablock.linkedItems.map((item: any) => {
            return (
              <CTABlock
                key={item.system.id}
                image={item.elements.backgroundimage.value[0]?.url}
                heading={item.elements.heading.value}
                subheading={item.elements.subheading.value}
                ctabuttons={item.elements.ctabuttons.linkedItems}
              />
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="px-5 sm:py-0">
          <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 items-center gap-5">
            <div>
              <img
                src={pageData.hostcityimage.value[0]?.url}
                alt={pageData.hostcityimage.value[0]?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: pageData.hostcitycontent.value,
                }}
              />

              <div className="flex mt-8">
                <Link
                  href={pageData.hostcityctalink.value}
                  className="underline text-primary text-xl flex gap-2 items-center"
                >
                  {pageData.hostcityctaname.value}

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
          </div>
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 0;
