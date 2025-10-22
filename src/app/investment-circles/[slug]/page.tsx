import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await deliveryClient
    .items()
    .type("pillardetailpagetycoons")
    .equalsFilter("elements.slug", slug)
    .toPromise();

  const pageData = response.data.items[0].elements as any;

  return (
    <div>
      <div className="relative h-screen flex justify-center items-center">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="w-full h-full absolute inset-0 object-cover brightness-50"
        />

        <div className="container">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl text-primary">
              {pageData.bannerheading.value}
            </h1>
            <h2 className="text-4xl text-white">
              {pageData.bannersubheading.value}
            </h2>
          </div>
        </div>
      </div>
      <Section>
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-4 rounded-xl bg-[#E8E8E8] overflow-hidden">
            <div className="p-10 sm:col-span-3 ">
              <div className="flex items-center gap-3 mb-4">
                <img
                  className="w-12 h-12 object-contain"
                  src={pageData.abouticon.value[0]?.url}
                  alt={pageData.abouticon.value[0]?.name}
                />
                <p className="text-2xl sm:text-3xl  tracking-tight font-medium">
                  {pageData.aboutheading.value}
                </p>
              </div>
              <div
                className="prose text-lg"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutcontent.value,
                }}
              />
            </div>

            <div className="sm:col-span-1">
              <img
                className="w-full h-full aspect-video object-cover"
                src={pageData.aboutimage.value[0]?.url}
                alt={pageData.aboutimage.value[0]?.name}
              />
            </div>
          </div>
        </div>
      </Section>

      <div className="py-12 sm:py-16 bg-secondary">
        <div className="container mx-auto">
          <p className="text-white text-3xl font-medium mb-4">
            {pageData.featureheading.value}
          </p>

          <div
            className="prose text-white mb-8"
            dangerouslySetInnerHTML={{ __html: pageData.featurecontent.value }}
          />
          <div className="grid sm:grid-cols-4 gap-5">
            {pageData.featureitems.linkedItems.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="flex flex-col justify-start items-center h-[230px]"
                >
                  <div className="bg-white shadow-2xl h-[120px] w-[120px] rounded-full p-5 flex items-center justify-center">
                    <img
                      className="w-22 h-22 object-contain"
                      src={item.elements.image.value[0]?.url}
                      alt={item.elements.image.value[0]?.name}
                    />
                  </div>

                  <p className="text-white text-center mt-6">
                    {item.elements.name.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-16 relative">
        <img
          src={pageData.benefitsbackgroundimage.value[0]?.url}
          alt={pageData.benefitsbackgroundimage.value[0]?.name}
          className="w-full h-full absolute inset-0 object-cover"
        />

        <div className="container mx-auto">
          <div className="relative z-10">
            <div className="grid sm:grid-cols-2 gap-5">
              {pageData.benefititems.linkedItems.map((item: any) => {
                return (
                  <div
                    className="text-white bg-black/50 p-10 rounded-2xl "
                    key={item.system.id}
                  >
                    <p className="text-2xl sm:text-4xl mb-8 max-w-sm font-medium">
                      {item.elements.name.value}
                    </p>
                    <div
                      className="prose prose-invert text-white"
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
      </div>
    </div>
  );
}

export const revalidate = 0;
