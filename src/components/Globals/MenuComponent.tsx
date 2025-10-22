"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function MenuComponent2() {
  const [pageData, setPageData] = useState<any | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Fetch global once, no-store as you had
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

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) document.documentElement.classList.add("overflow-hidden");
    else document.documentElement.classList.remove("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const menuItems: any[] = useMemo(
    () => pageData?.headermenuitems?.linkedItems ?? [],
    [pageData]
  );

  if (!pageData) return null;

  const onLight = scrolled || menuOpen || pathname === "/investment-circles";

  // Helpers to read items safely (Kontent structures often vary)

  const getChildren = (item: any): any[] => {
    // try common element names for linked sub-items
    return (
      item?.elements?.subitems?.linkedItems ??
      item?.elements?.children?.linkedItems ??
      item?.elements?.items?.linkedItems ??
      []
    );
  };

  const hasChildren = (item: any) => getChildren(item).length > 0;

  const logoSrc =
    pageData.logocolored?.value?.[0]?.url ??
    pageData.logo?.value?.[0]?.url ??
    "";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        "py-4 md:py-5",
        onLight ? "bg-white  shadow-sm" : "bg-transparent",
      ].join(" ")}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="Go to homepage">
            <img
              width={140}
              height={44}
              className="object-contain h-11 w-[140px]"
              src={logoSrc}
              alt={pageData.logocolored?.value?.[0]?.name ?? "Logo"}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {menuItems.map((item: any) => {
                const children = getChildren(item);
                const href = item?.elements?.link?.value || "#";
                const isActive =
                  href !== "#" && pathname?.startsWith(href || "");
                return (
                  <li key={item.system.id} className="relative group">
                    {/* Top-level link */}
                    <Link
                      href={href}
                      className={[
                        "inline-flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors",
                        onLight
                          ? "text-black hover:text-primary"
                          : "text-white hover:text-primary",
                      ].join(" ")}
                    >
                      {item?.elements?.name?.value ?? "Untitled"}
                      {children.length > 0 && (
                        <ChevronDown
                          className="size-4 opacity-80 transition-transform group-hover:rotate-180"
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    {/* Desktop dropdown */}
                    {children.length > 0 && (
                      <div
                        className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition
                                   absolute left-0 top-6 mt-2 min-w-60 rounded-xl bg-white shadow-lg
                                    p-2"
                        role="menu"
                        aria-label={`${item?.elements?.name?.value} submenu`}
                      >
                        {children.map((child: any) => {
                          const childHref = child?.elements?.link?.value || "#";
                          return (
                            <Link
                              key={child.system.id}
                              href={childHref}
                              role="menuitem"
                              className="block rounded-lg px-3 py-2 text-sm text-black hover:bg-black/5"
                            >
                              {child?.elements?.name?.value ?? "Item"}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA(s) */}
          <div className="hidden lg:block shrink-0">
            {pageData.ctabutton?.linkedItems?.map((item: any, i: number) => (
              <Link
                key={i}
                href={item?.elements?.link?.value || "#"}
                className={[
                  "px-4 py-2 rounded-full font-medium transition-colors text-sm border-2",
                  onLight
                    ? "border-black text-black hover:bg-black hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-black",
                ].join(" ")}
              >
                {item?.elements?.name?.value}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className={[
              "lg:hidden inline-flex items-center justify-center rounded-md p-2 ring-1 ring-inset",
              onLight
                ? "text-black ring-black/10 hover:bg-black/5"
                : "text-white ring-white/20 hover:bg-white/10",
            ].join(" ")}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={[
          "lg:hidden transition-[max-height,opacity] duration-300 overflow-hidden",
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div
          className={[
            "mt-3 mx-4 rounded-2xl shadow-lg ",
            "bg-white text-black",
          ].join(" ")}
        >
          <nav className="p-2">
            <ul className="divide-y divide-black/10">
              {menuItems.map((item: any) => {
                const id = item.system.id as string;
                const children = getChildren(item);
                const href = item?.elements?.link?.value || "#";
                const open = !!openSub[id];

                return (
                  <li key={id} className="py-1">
                    <div className="flex items-stretch">
                      {/* Parent link (left area) */}
                      <Link
                        href={href}
                        className="flex-1 rounded-lg px-3 py-3 text-base hover:bg-black/5"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item?.elements?.name?.value ?? "Untitled"}
                      </Link>

                      {/* Sub toggle (right chevron) if has children */}
                      {children.length > 0 && (
                        <button
                          className="ml-1 rounded-lg px-3 py-3 hover:bg-black/5"
                          aria-expanded={open}
                          aria-controls={`sub-${id}`}
                          onClick={() =>
                            setOpenSub((s) => ({ ...s, [id]: !s[id] }))
                          }
                          title="Show submenu"
                        >
                          <ChevronDown
                            className={[
                              "size-4 transition-transform",
                              open ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu (collapsible) */}
                    {children.length > 0 && (
                      <div
                        id={`sub-${id}`}
                        className={[
                          "grid transition-[grid-template-rows,opacity] duration-300",
                          open
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <ul className="mt-1 mb-2 ml-2 rounded-xl bg-black/[0.03]">
                            {children.map((child: any) => {
                              const childHref =
                                child?.elements?.link?.value || "#";
                              return (
                                <li key={child.system.id}>
                                  <Link
                                    href={childHref}
                                    className="block px-4 py-2.5 text-sm hover:bg-black/5 rounded-xl"
                                    onClick={() => setMenuOpen(false)}
                                  >
                                    {child?.elements?.name?.value ?? "Item"}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Mobile CTA(s) */}
            {pageData.ctabutton?.linkedItems?.length ? (
              <div className="mt-2 pt-2 border-t border-black/10 grid gap-2">
                {pageData.ctabutton.linkedItems.map((item: any, i: number) => (
                  <Link
                    key={i}
                    href={item?.elements?.link?.value || "#"}
                    className="px-4 py-3 rounded-full font-medium text-center bg-primary text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item?.elements?.name?.value}
                  </Link>
                ))}
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}
