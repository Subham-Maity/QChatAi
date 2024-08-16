"use client";

import Hero from "@/components/landing/hero/hero";
import Work from "@/components/landing/work/work";
import Features from "@/components/landing/features/features";
import Pricing from "@/components/landing/pricing/pricing";
import Customer from "@/components/landing/customer/customer";
import Started from "@/components/landing/started/started";
import { ScrollerMotion } from "scroller-motion";

const HomePage = () => {
  return (
    <section className="landing-theme w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
      <ScrollerMotion>
        <Hero />
        <Work />
        <Features />
        <Pricing />
        <Customer />
        <Started />
      </ScrollerMotion>
    </section>
  );
};

export default HomePage;
