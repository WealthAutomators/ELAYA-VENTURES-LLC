"use client";

import { Navbar } from "@/components/navbar/navbar";
import { SearchBar } from "@/components/navbar/search-bar";
import { company } from "@/data/company";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="hidden border-b border-border/80 bg-muted/50 text-[11px] tracking-[0.16em] text-muted-foreground sm:block">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <a href={`mailto:${company.email}`} className="transition-colors hover:text-foreground">
            {company.email}
          </a>
          <p className="uppercase">
            {company.address.city}, {company.address.state}
          </p>
        </div>
      </div>
      <Navbar />
      <SearchBar />
    </div>
  );
}
