import CTAButton from "@/components/Blocks/CTAComponent";
import Heading2 from "@/components/UI/Heading2";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_NAME, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import React, { cache } from "react";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("objectives_page___tycoons")
    .depthParameter(2)
    .toPromise();
  return res.data.item.elements as any;
});

export async function generateMetadata() {
  const data = await getPageData();
  return buildMetadata({
    title: data.metadata__pagetitle?.value,
    description: data.metadata__metadescription?.value,
    image: `${SITE_URL}assets/logos/tycoons-thumbnail.png`,
    canonical: `${SITE_URL}objectives`,
  });
}

export default async function page() {
  const pageData = await getPageData();
  if (!pageData) return null;
  return (
    <div>
      <div className="relative py-12 sm:py-16 flex justify-center items-center">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="w-full h-full absolute inset-0 object-cover brightness-50"
        />

        <div className="container">
          <div className="relative z-10 pt-20">
            <h1 className="text-4xl sm:text-6xl text-primary mb-4">
              {pageData.bannerheading.value}
            </h1>
            <div
              className="prose text-white"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />

            {pageData.bannercta.linkedItems && (
              <div className="mt-8 flex flex-wrap gap-2">
                {pageData.bannercta.linkedItems.map((item: any) => {
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
      </div>

      <Section>
        <div className="container mx-auto">
          <div className="relative">
            <div className="grid grid-cols-1 gap-5">
              {pageData.objectiveitems.linkedItems.map((item: any) => {
                return (
                  <div
                    key={item.system.id}
                    className="p-14 hover-card-lift gradient rounded-2xl sticky top-40 shadow-top"
                  >
                    <h4 className="text-3xl text-white mb-4">
                      {item.elements.name.value}
                    </h4>
                    <div
                      className="text-white prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: item.elements.content.value,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container mx-auto">
          <Heading2 className="text-center mb-8">
            {pageData.participantsheading.value}
          </Heading2>

          <div className="grid sm:grid-cols-3 gap-5">
            {pageData.participantitems.linkedItems.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="p-5 hover-card-lift shadow-xl rounded-2xl"
                >
                  <h4 className="text-2xl sm:text-3xl text-primary mb-4">
                    {item.elements.name.value}
                  </h4>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: item.elements.content.value,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}

export const revalidate = 0;
