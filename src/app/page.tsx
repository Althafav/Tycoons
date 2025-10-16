import HeroSection from "@/components/HeroSection";
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
      </div>
    </div>
  );
}
