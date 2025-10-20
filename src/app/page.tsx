import HeroSection from "@/components/HeroSection";
import Section from "@/components/UI/Section";
import { deliveryClient } from "@/modules/Globals";

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
          <div className="relative py-8 sm:py-12">
            <img
              src={pageData.statisticbackgroundimage.value[0]?.url}
              alt={pageData.statisticsheading.value}
              className="w-full object-cover absolute inset-0 h-full brightness-50"
            />
            <div className="container mx-auto">
              <div className="relative z-10">
                <h2 className="text-6xl font-bold text-center text-white">
                  {pageData.statisticsheading.value}
                </h2>

                <div>
                  {pageData.statsitems.linkedItems.map((item: any) => {
                    return (
                      <div key={item.system.id}>
                        <h4>{item.elements.count.value}</h4>
                      </div>
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
