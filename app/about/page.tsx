import { company } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import { PageHero, PageSection } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${company.name}`}
        description={company.description}
        breadcrumbs={[{ label: "About" }]}
      />

      <Container className="pb-16">
        <div className="grid items-center gap-10 py-12 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden border border-border">
            <Image src="/banners/about.jpg" alt={`About ${company.name}`} fill className="object-cover" sizes="50vw" />
          </div>
          <PageSection title="The assortment">
            <p>
              {company.name} is a contemporary retailer of home, kitchen, and everyday goods.
              The catalog is assembled around material quality, useful proportion, and a calm
              visual language — textiles, tableware, desk objects, travel pieces, and small
              household tools meant to be used often.
            </p>
            <p className="mt-4">
              Orders ship from the United States. For questions about a product or an order,
              write to {company.email}.
            </p>
          </PageSection>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Home & living", desc: "Textiles and serving pieces for rooms that are lived in." },
            { title: "Kitchen", desc: "Stoneware, boards, jars, and the tools used every morning." },
            { title: "Work & travel", desc: "Desk objects, packing pieces, and bags built for repeated use." },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-card p-8">
              <h3 className="font-display text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <PageSection title="From recent orders" className="mt-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.slice(0, 8).map((t) => (
              <div key={t.id} className="border border-border bg-card p-6">
                <StarRating rating={t.rating} showCount={false} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shop">Shop the catalog</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
