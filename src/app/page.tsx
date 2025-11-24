import ScrollRevealText from "@/components/Animations/ScrollRevealText";
import SplitText from "@/components/Animations/SplitText";
import CTABlock2 from "@/components/Blocks/CTABlock2";
import CTAButton from "@/components/Blocks/CTAComponent";
import HeroSection from "@/components/HeroSection";
import Section from "@/components/UI/Section";
import { deliveryClient, SITE_NAME, SITE_URL } from "@/modules/Globals";
import Link from "next/link";

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
      canonical: `${SITE_URL}`,
    },
    openGraph: {
      title: pageData.metadata__pagetitle.value,
      description: pageData.metadata__metadescription.value,
      url: `${SITE_URL}`,
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
            {/* <div
              className="prose max-w-4xl text-xl"
              dangerouslySetInnerHTML={{ __html: pageData.aboutcontent.value }}
            /> */}
            <ScrollRevealText content={pageData.aboutcontent.value} />
          </div>
        </Section>

        <Section>
          <div
            className="relative py-12 sm:py-20 overflow-hidden bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: `url(${pageData.statisticbackgroundimage.value[0]?.url})`,
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="container mx-auto relative z-10">
              <SplitText
                text={pageData.statisticsheading.value}
                as="h2"
                className={`text-4xl sm:text-6xl font-bold text-center text-white mb-10`}
              />

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

              <div className="flex justify-center mt-8">
                {pageData.bannercta.linkedItems.map((item: any) => (
                  <Link
                    href={item.elements.link.value}
                    key={item.system.id}
                    className="px-4 py-2 bg-white text-black rounded-full transition-all duration-300 hover:bg-transparent hover:text-white hover:border hover:border-white"
                  >
                    {item.elements.name.value}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                {/* <h2 className="text-primary text-3xl sm:text-5xl">
                  {pageData.downloadbrochureheading.value}
                </h2> */}
                <SplitText
                  text={pageData.downloadbrochureheading.value}
                  as="h1"
                  className="text-primary text-3xl sm:text-5xl"
                />
              </div>
              <div>
                <ScrollRevealText
                  content={pageData.downloadbrochurecontent.value}
                />

                {pageData.downloadbrochurectalink.value && (
                  <div className="mt-8">
                    <CTAButton
                      variant="secondary"
                      buttonname={pageData.downloadbrochurectaname.value}
                      buttonlink={pageData.downloadbrochurectalink.value}
                    />
                  </div>
                )}
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
                    <div className="group relative  overflow-hidden">
                      <img
                        src={item.elements.image.value[0]?.url}
                        alt=""
                        className="h-[270px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-primary text-2xl mb-3">
                        {item.elements.name.value}
                      </h4>
                      <div
                        className="prose line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: item.elements.content.value,
                        }}
                      />

                      <div className="mt-8">
                        <Link
                          href={item.elements.ctalink.value}
                          className="w-full bg-secondary hover:bg-secondaryDark py-2 block text-center rounded-full text-white"
                        >
                          {item.elements.ctaname.value}
                        </Link>
                      </div>
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

        {pageData.ctablock.linkedItems.map((item: any) => {
          return (
            <CTABlock2
              key={item.system.id}
              backgroundimage={item.elements.backgroundimage.value[0]?.url}
              heading={item.elements.heading.value}
              subheading={item.elements.subheading.value}
              ctabutton={item.elements.ctabuttons.linkedItems}
            />
          );
        })}
      </div>
    </div>
  );
}

export const revalidate = 0;
