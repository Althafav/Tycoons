import CTAButton from "@/components/Blocks/CTAComponent";
import HeroSection from "@/components/HeroSection";
import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";
import Link from "next/link";

export default async function Home() {
  const { data } = await deliveryClient
    .item("home_page___tycoons")
    .depthParameter(2)
    .toPromise();

  const pageData = data.item.elements as any;

  return (
    <div className="page">
      <div>
        <HeroSection
          heading={pageData.bannerheading.value}
          subheading={pageData.bannersubheading.value}
          bannerimage={pageData.bannerimage.value[0]?.url}
          ctabuttons={pageData.bannercta.linkedItems}
        />

        <Section>
          <div className="container mx-auto">
            <div
              className="prose max-w-4xl text-xl"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            />
          </div>
        </Section>

        <Section>
          <div className="relative py-12 sm:py-20 overflow-hidden">
            <img
              src={pageData.statisticbackgroundimage.value[0]?.url}
              alt={pageData.statisticsheading.value}
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />

            <div className="container mx-auto relative z-10">
              <h2 className="text-4xl sm:text-6xl font-bold text-center text-white mb-10">
                {pageData.statisticsheading.value}
              </h2>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-20">
                {pageData.statsitems.linkedItems.map(
                  (item: any, index: number) => (
                    <div
                      key={item.system.id}
                      className="flex flex-col justify-center items-center relative"
                    >
                      {index !== 0 && (
                        <div className="hidden sm:block absolute left-[-40px] top-1/2 -translate-y-1/2 w-px h-10 bg-white/60" />
                      )}

                      <h4 className="text-4xl sm:text-5xl text-white font-bold mb-2">
                        {item.elements.count.value}
                      </h4>
                      <p className="text-lg sm:text-xl text-white text-center opacity-90">
                        {item.elements.name.value}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-center">
                {pageData.bannercta.linkedItems.map((item: any) => {
                  return (
                    <Link href={item.elements.link.value} key={item.system.id}>
                      {item.elements.name.value}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <h2 className="text-primary text-5xl">
                  {pageData.downloadbrochureheading.value}
                </h2>
              </div>
              <div>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: pageData.downloadbrochurecontent.value,
                  }}
                />

                <div className="mt-8">
                  <CTAButton
                    variant="secondary"
                    buttonname={pageData.downloadbrochurectaname.value}
                    buttonlink={pageData.downloadbrochurectalink.value}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto">
            <h2 className="text-3xl mb-8">{pageData.pillarsheading.value}</h2>

            <div className="grid sm:grid-cols-3 gap-5">
              {pageData.pillaritems.linkedItems.map((item: any) => {
                return (
                  <div
                    key={item.system.id}
                    className="shadow rounded overflow-hidden"
                  >
                    <img src={item.elements.image.value[0]?.url} alt="" />
                    <div className="p-5">
                      <h4 className="text-primary text-2xl mb-3">
                        {item.elements.name.value}
                      </h4>
                      <div
                        className="prose"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {pageData.agendctabuttonlink.value && (
          <Section>
            <div className="container mx-auto">
              <div className="cta-card w-full relative gradient h-[380px] rounded-2xl flex items-center">
                <img
                  src={pageData.agendactaimage.value[0]?.url}
                  alt=""
                  className="absolute right-0 h-full object-cover"
                />

                <div className="p-20">
                  <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl text-white">
                      {pageData.agendactaheading.value}
                    </h2>
                    <p className="text-white">
                      {pageData.agendactasubheading.value}
                    </p>

                    <div className="mt-8">
                      <CTAButton
                        variant="secondary"
                        buttonname={pageData.agendctabuttonname.value}
                        buttonlink={pageData.agendctabuttonlink.value}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

        <Section>
          <div className="relative h-[560px] flex justify-center items-center">
            <img
              src={pageData.ctaimage.value[0]?.url}
              alt={pageData.ctaheading.value}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="container mx-auto">
              <div className="relative max-w-4xl mx-auto z-10">
                <h2 className="text-2xl sm:text-4xl text-white text-center">
                  {pageData.ctaheading.value}
                </h2>

                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                  {pageData.ctabutton.linkedItems.map((item: any) => {
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
      </div>
    </div>
  );
}

export const revalidate = 0;
