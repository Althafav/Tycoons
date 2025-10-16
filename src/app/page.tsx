import { deliveryClient } from "@/modules/Globals2";
import Image from "next/image";

export default async function Home() {
  const response = await deliveryClient
    .item("home_page___tycoons")
    .depthParameter(3)
    .toPromise();
  const pageData = response.data.item.elements;
  console.log(pageData, "response");
  return <div>{pageData.bannerheading.value}</div>;
}
