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
      </div>
    </div>
  );
}
