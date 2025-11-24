// app/tycoons-attendees/[slug]/page.tsx

import Section from "@/components/UI/Section";
import { SITE_URL } from "@/modules/Globals";
import { buildMetadata } from "@/modules/seo";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";

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

  const unique = Array.from(
    new Map(
      merged.map((item) => [`${item.Name}-${item.Organization}`, item])
    ).values()
  );

  return unique;
});

function createSlug(person: any) {
  const base = `${person.Name || ""}-${person.Organization || ""}`;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Metadata for each attendee page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const registrants = await getRegistrants();
  const person = registrants.find((p) => createSlug(p) === slug);

  if (!person) {
    return buildMetadata({
      title: "Tycoons Attendee",
      description: "Tycoons attendee details.",
      canonical: `${SITE_URL}tycoons-attendees`,
    });
  }

  return buildMetadata({
    title: person.Name || "Tycoons Attendee",
    description: person.Organization || "Tycoons attendee details.",
    image:
      person.ProfilePhoto || `${SITE_URL}assets/logos/tycoons-thumbnail.png`,
    canonical: `${SITE_URL}tycoons-attendees/${slug}`,
  });
}

export default async function AttendeeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const registrants = await getRegistrants();
  const person = registrants.find((p) => createSlug(p) === slug);

  if (!person) {
    return notFound();
  }

  return (
    <div className="relative bg-white py-12 sm:py-16">
      <img
        className="w-full h-full object-cover absolute inset-0"
        src="/assets/imgs/skyscrapers-from-low-angle-view 1 (2).webp"
        alt=""
      />
      <Section className="relative z-10">
        <div className="container mx-auto ">
          <div className="grid gap-8 sm:grid-cols-3 items-start">
            {/* Photo */}
            <div className="col-span-1">
              {person.ProfilePhoto && (
                <img
                  src={person.ProfilePhoto}
                  alt={person.Name}
                  className="w-full h-auto rounded-2xl object-cover border border-gray-200"
                />
              )}
            </div>

            {/* Details */}
            <div  className="col-span-2">
              <h1 className="text-3xl font-semibold text-primary mb-2">
                {person.Name}
              </h1>

              {person.Organization && (
                <p className="text-lg text-white mb-2">{person.Organization}</p>
              )}

              {person.Designation && (
                <p className="text-md text-white mb-2">{person.Designation}</p>
              )}

              {person.NetWorth && (
                <p className="text-md text-white mb-2">
                  Net Worth: {person.NetWorth}
                </p>
              )}

              {person.Intro && (
                <div className="mt-8 prose max-w-none text-gray-200" dangerouslySetInnerHTML={{ __html: person.Intro }} />
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
