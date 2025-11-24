import Section from "@/components/UI/Section";
import { deliveryClient, SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Link from "next/link";
import React, { cache } from "react";

const getPageData = cache(async () => {
  const res = await deliveryClient
    .item("attendee_page_tycoons")
    .depthParameter(2)
    .toPromise();
  return res.data.item.elements as any;
});

const PACKAGE_IDS = [
  "6FB38EBA-94C8-4155-BB55-64CE5B9B1D50",
  "7B299295-E84C-4F84-A10D-C8AC7721B652",
  "32D37281-31F9-4D80-A75D-E3B020687333",
];

async function fetchRegistrantsByPackage(packageId: string): Promise<any[]> {
  const res = await fetch(
    `https://api.strategic.ae/api/Website/GetRegistrants?packageid=${packageId}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error(
      "Failed to fetch registrants for package:",
      packageId,
      res.status
    );
    return [];
  }

  const data = (await res.json()) as any[];
  return data ?? [];
}

const getRegistrants = cache(async (): Promise<any[]> => {
  const results = await Promise.all(
    PACKAGE_IDS.map((id) => fetchRegistrantsByPackage(id))
  );

  const merged = results.flat();

  // OPTIONAL: de-duplicate by Name + Organization
  const unique = Array.from(
    new Map(
      merged.map((item) => [`${item.Name}-${item.Organization}`, item])
    ).values()
  );

  return unique;
});

// Simple slug helper (re-use this in detail page)
function createSlug(person: any) {
  const base = `${person.Name || ""}-${person.Organization || ""}`;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") 
    .replace(/(^-|-$)/g, "");
}

export async function generateMetadata() {
  const data = await getPageData();
  return buildMetadata({
    title: data.metadata__pagetitle?.value,
    description: data.metadata__metadescription?.value,
    image: `${SITE_URL}assets/logos/tycoons-thumbnail.png`,
    canonical: `${SITE_URL}objectives`,
  });
}

export default async function Page() {
  const [pageData, registrants] = await Promise.all([
    getPageData(),
    getRegistrants(),
  ]);

  if (!pageData) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="w-full relative">
        <img
          src={pageData.bannerimage.value[0]?.url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 p-10 sm:p-20 container mx-auto flex justify-center items-center">
          <div className="pt-20">
            <h2 className="text-3xl sm:text-6xl text-primary mb-3 text-center">
              {pageData.bannerheading.value}
            </h2>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050816]" />
      </div>

      <Section>
        <div className="container mx-auto">
          {registrants.length === 0 && (
            <p className="text-center text-gray-300">
              No attendees found at the moment.
            </p>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {registrants.map((person, idx) => {
              const slug = createSlug(person);

              return (
                <Link
                  href={`/attendees/${slug}`}
                  key={idx}
                  className=""
                >
                  <div className="flex flex-col items-start gap-4">
                    {person.ProfilePhoto && (
                      <img
                        src={person.ProfilePhoto}
                        alt={person.Name}
                        className="w-full h-[298px] bg-gray-600 rounded-2xl object-cover border border-white/20"
                      />
                    )}

                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-primary mb-4">
                        {person.Name}
                      </h4>
                      <p className="text-sm text-secondaryDark">
                        {person.Organization}
                      </p>
                      {person.NetWorth && (
                        <p className="text-sm mt-1 text-secondaryDark">
                          Net Worth: {person.NetWorth}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
