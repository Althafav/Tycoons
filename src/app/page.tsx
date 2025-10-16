import HeroSection from "@/components/HeroSection";
import { deliveryClient } from "@/modules/Globals";
import Image from "next/image";

export default async function Home() {
  const response = await deliveryClient
    .item("home_page___tycoons")
    .depthParameter(3)
    .toPromise();
  const pageData = response.data.item.elements;

  return (
    <div className="page">
      <div>
        <HeroSection
          heading={pageData.bannerheading.value}
          subheading={pageData.bannersubheading.value}
          bannerimage={pageData.bannerimage.value[0]?.url}
        />
      </div>
    </div>
  );
}
