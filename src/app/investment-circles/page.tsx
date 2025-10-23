import Section from "@/components/UI/Section";
import { deliveryClient, SITE_NAME, SITE_URL } from "@/modules/Globals";
import Link from "next/link";
import React from "react";
import PillarItemsAnimated from "./PillarItemsAnimated";

export async function generateMetadata() {
  const { data } = await deliveryClient
    .item("pillars_page___tycoons")
    .depthParameter(2)
    .toPromise();

  const pageData = data.item.elements as any;

  return {
    title: pageData.metadata__pagetitle.value,
    description: pageData.metadata__metadescription.value,
    alternates: {
      canonical: `${SITE_URL}investment-circles`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${SITE_URL}investment-circles`,
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
    .item("pillars_page___tycoons")
    .depthParameter(2)
    .toPromise();

  const pageData = data.item.elements as any;
  return (
    <div>
      <div className="">
        <div className=" w-full relative gradient overflow-hidden  rounded-2xl flex items-center py-8">
          <img
            src={pageData.bannerimage.value[0]?.url}
            alt=""
            className="absolute inset-0 w-full h-full  object-contain"
          />

          <div className="p-10 sm:p-20 container mx-auto">
            <div className="relative z-10 pt-20">
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
          <PillarItemsAnimated items={pageData.pillaritems.linkedItems} />
        </Section>
      </div>
    </div>
  );
}
export const revalidate = 0;
