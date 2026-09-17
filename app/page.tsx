import { HeroBanner } from "@/components/homepage/hero-banner";
import { CategoryCarousel } from "@/components/homepage/category-carousel";
import { FeaturedCollection } from "@/components/homepage/featured-collection";
import { EditorialShowcase } from "@/components/homepage/editorial-showcase";
import { NewArrivals } from "@/components/homepage/new-arrivals";
import { SecondaryCollection } from "@/components/homepage/secondary-collection";
import { PromotionalBanner } from "@/components/homepage/promotional-banner";
import { AboutSection } from "@/components/homepage/about-section";
import { FeaturesRow } from "@/components/homepage/features-row";
import { Newsletter } from "@/components/homepage/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryCarousel />
      <FeaturedCollection />
      <EditorialShowcase />
      <NewArrivals />
      <SecondaryCollection />
      <PromotionalBanner />
      <AboutSection />
      <FeaturesRow />
      <Newsletter />
    </>
  );
}
