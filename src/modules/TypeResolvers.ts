import { Aboutv2 } from "@/models/aboutv2";
import { Acrossglobev2 } from "@/models/acrossglobev2";
import { Basiccontenttype } from "@/models/basiccontenttype";
import { Corebusinessitemv2 } from "@/models/corebusinessitemv2";
import { Corebusinessv2 } from "@/models/corebusinessv2";
import { Eventcontainerv2 } from "@/models/eventcontainerv2";
import { Eventitemv2 } from "@/models/eventitemv2";
import { Eventv2 } from "@/models/eventv2";
import { Footeritemv2 } from "@/models/footeritemv2";
import { Footerv2 } from "@/models/footerv2";
import { Form2026 } from "@/models/form2026";
import { Homebannerv2 } from "@/models/homebannerv2";
import { Menuitemrevamp } from "@/models/menuitemrevamp";
import { Menurevamp } from "@/models/menurevamp";
import { Ourjourneyitemv2 } from "@/models/ourjourneyitemv2";
import { Ourjourneyv2 } from "@/models/ourjourneyv2";
import { Portfolioitemv2 } from "@/models/portfolioitemv2";
import { Portfoliov2 } from "@/models/portfoliov2";
import { Pressreleaseitemv2 } from "@/models/pressreleaseitemv2";
import { Pressreleasev2 } from "@/models/pressreleasev2";
import { Promotionv2 } from "@/models/promotionv2";
import { Statsv2 } from "@/models/statsv2";
import { Videosv2 } from "@/models/videosv2";

const KontentDelivery = require("@kentico/kontent-delivery");

export const TypeResolver = [
   new KontentDelivery.TypeResolver("Menurevamp", (rawData: any) => new Menurevamp()),
   new KontentDelivery.TypeResolver("Menuitemrevamp", (rawData: any) => new Menuitemrevamp()),
   new KontentDelivery.TypeResolver("Footerv2", (rawData: any) => new Footerv2()),
   new KontentDelivery.TypeResolver("Footeritemv2", (rawData: any) => new Footeritemv2()),
   new KontentDelivery.TypeResolver("Homebannerv2", (rawData: any) => new Homebannerv2()),
   new KontentDelivery.TypeResolver("Statsv2", (rawData: any) => new Statsv2()),
   new KontentDelivery.TypeResolver("Promotionv2", (rawData: any) => new Promotionv2()),
   new KontentDelivery.TypeResolver("Videosv2", (rawData: any) => new Videosv2()),
   new KontentDelivery.TypeResolver("Portfoliov2", (rawData: any) => new Portfoliov2()),
   new KontentDelivery.TypeResolver("Portfolioitemv2", (rawData: any) => new Portfolioitemv2()),
   new KontentDelivery.TypeResolver("Acrossglobev2", (rawData: any) => new Acrossglobev2()),
   new KontentDelivery.TypeResolver("Ourjourneyv2", (rawData: any) => new Ourjourneyv2()),
   new KontentDelivery.TypeResolver("Ourjourneyitemv2", (rawData: any) => new Ourjourneyitemv2()),
   new KontentDelivery.TypeResolver("Corebusinessv2", (rawData: any) => new Corebusinessv2()),
   new KontentDelivery.TypeResolver("Corebusinessitemv2", (rawData: any) => new Corebusinessitemv2()),
   new KontentDelivery.TypeResolver("Aboutv2", (rawData: any) => new Aboutv2()),
   new KontentDelivery.TypeResolver("Eventcontainerv2", (rawData: any) => new Eventcontainerv2()),
   new KontentDelivery.TypeResolver("Eventv2", (rawData: any) => new Eventv2()),
   new KontentDelivery.TypeResolver("Eventitemv2", (rawData: any) => new Eventitemv2()),
   new KontentDelivery.TypeResolver("Pressreleasev2", (rawData: any) => new Pressreleasev2()),
   new KontentDelivery.TypeResolver("Pressreleaseitemv2", (rawData: any) => new Pressreleaseitemv2()),
   new KontentDelivery.TypeResolver("Basiccontenttype", (rawData: any) => new Basiccontenttype()),
   new KontentDelivery.TypeResolver("Form2026", (rawData: any) => new Form2026()),

];
