"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<any | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/global", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch global data");
        const data = (await res.json()) as any;
        if (alive) setPageData(data);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!pageData) return null;

  console.log(pageData, "data");
  return (
    <div className="bg-secondary py-12 sm:py-16">
      <div className="container mx-auto">
        <div className="flex justify-between sm:flex-row flex-col gap-5">
          <div>
            <img
              src={pageData.logowhite.value[0]?.url}
              alt={pageData.logowhite.value[0]?.name}
              className="w-[140px] object-contain mb-8"
            />
            <div>
              <p className="text-white mb-2">Follow us on</p>
              <hr className="border-b border-2 border-white mb-4" />
              <div className="flex gap-3">
                <Link
                  href={pageData.sociallinks__linkedinurl.value}
                  target="_blank"
                  className="bg-white rounded-full p-2"
                >
                  <FaLinkedinIn
                    className=" hover:scale-75 transition duration-75 ease-in text-secondary"
                    size={24}
                  />
                </Link>

                <Link
                  href={pageData.sociallinks__facebookurl.value}
                  className="bg-white rounded-full p-2"
                >
                  <FaFacebookF
                    className=" hover:scale-75 transition duration-75 ease-in text-secondary"
                    size={24}
                  />
                </Link>

                <Link
                  href={pageData.sociallinks__xurl.value}
                  className="bg-white rounded-full p-2"
                >
                  <FaXTwitter
                    className=" hover:scale-75 transition duration-75 ease-in text-secondary"
                    size={24}
                  />
                </Link>

                <Link
                  href={pageData.sociallinks__youtubeurl.value}
                  className="bg-white rounded-full p-2"
                >
                  <FaYoutube
                    className=" hover:scale-75 transition duration-75 ease-in text-secondary"
                    size={24}
                  />
                </Link>

                <Link
                  href={pageData.sociallinks__instagramurl.value}
                  className="bg-white rounded-full p-2"
                >
                  <FaInstagram
                    className="text-primary-orange hover:scale-75 transition duration-75 ease-in text-secondary"
                    size={24}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="text-left w-full sm:w-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-2">
              {pageData.footermenuitems.linkedItems.map((item: any) => (
                <Link
                  key={item.system.id}
                  href={item.elements.link.value}
                  className="text-white text-sm hover:text-gray-200"
                >
                  {item.elements.name.value}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
