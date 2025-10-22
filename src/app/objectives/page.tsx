import Heading2 from "@/components/UI/Heading2";
import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";
import React from "react";

export default async function page() {
  const { data } = await deliveryClient
    .item("objectives_page___tycoons")
    .depthParameter(2)
    .toPromise();

  const pageData = data.item.elements as any;
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
          </div>
        </div>
      </div>

      <Section>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-5">
            {pageData.objectiveitems.linkedItems.map((item: any) => {
              return (
                <div
                  key={item.system.id}
                  className="p-10 gradient shadow-xl rounded-2xl"
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
      </Section>

      <Section>
        <div className="container mx-auto">
          <Heading2 className="text-center mb-8">
            {pageData.participantsheading.value}
          </Heading2>

          <div className="grid sm:grid-cols-3 gap-5">
            {pageData.participantitems.linkedItems.map((item: any) => {
              return (
                <div key={item.system.id} className="p-5 shadow-xl rounded-2xl">
                  <h4 className="text-3xl text-primary mb-4">
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
