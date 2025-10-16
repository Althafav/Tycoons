import { TypeResolver } from "./TypeResolvers";


const KontentDelivery = require("@kentico/kontent-delivery");

export default class Globals {
    static PROJECT_ID: string = "cd358952-bd24-0080-a902-0fd831c563a1";

    static SECURE_API_KEY: string =
      "ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAianRpIjogImIxZDlmNDUwMjIyNjQwOTVhNjdhNzk3ZGY4NGVjZjMzIiwNCiAgImlhdCI6ICIxNjIyNTI2MDA0IiwNCiAgImV4cCI6ICIxOTY4MTI2MDA0IiwNCiAgInByb2plY3RfaWQiOiAiY2QzNTg5NTJiZDI0MDA4MGE5MDIwZmQ4MzFjNTYzYTEiLA0KICAidmVyIjogIjEuMC4wIiwNCiAgImF1ZCI6ICJkZWxpdmVyLmtlbnRpY29jbG91ZC5jb20iDQp9.uMKEa5j83DFt2-e1o7GU_AJhoXLOj6JoZWrCuJBaBTQ";
  
    static KontentClient: any = new KontentDelivery.DeliveryClient({
        projectId: Globals.PROJECT_ID,
        globalQueryConfig: {
            useSecuredMode: true, // Queries the Delivery API using secure access.
        },
        secureApiKey: Globals.SECURE_API_KEY,
        typeResolvers: TypeResolver,

    });

    static SITE_NAME = "Strategic";

    static CURRENT_LANG_CODENAME: string = "default";

    static LANG_COOKIE: string = "0cd50f-lang-cookie";

    static BASE_URL: string =
        process.env.NODE_ENV === "production"
            ? "https://www.thetycoons.com/"
            : "http://localhost:3000/";
}