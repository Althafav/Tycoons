import Section from "@/components/UI/Section";
import Link from "next/link";
import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import TopSpacer from "@/components/UI/TopSpacer";

export default function Page() {
  return (
    <>
      <div className={`h-[84px] bg-black`} />;
      <div className="relative  ">
        <Section>
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                The Tycoons
              </span>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-primary">
                Reservations Opening{" "}
                <span className="text-secondary">Soon</span>
              </h1>
            </div>

            {/* Card */}
            <div className="mx-auto mt-8 sm:mt-12 max-w-2xl">
              <div className="rounded-3xl border border-neutral-200/60 bg-white/70 backdrop-blur-md shadow-lg">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                      <Mail className="h-6 w-6 text-secondary" aria-hidden />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                        Get in touch
                      </h2>
                      <p className="mt-2 text-neutral-600">
                        For any inquiries or more information, please contact us
                        at info@thetycoons.com.
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href="mailto:info@thetycoons.com"
                          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-white font-medium shadow hover:opacity-90 transition"
                        >
                          <Mail className="h-4 w-4" aria-hidden />
                          Email us
                        </a>

                        <Link
                          href="/"
                          className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-neutral-800 font-medium shadow-sm hover:bg-neutral-50 transition"
                        >
                          <ArrowLeft className="h-4 w-4" aria-hidden />
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
