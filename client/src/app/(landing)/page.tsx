import Hero from "@/components/landing/hero/hero";
import Work from "@/components/landing/work/work";

const HomePage = () => {
  return (
    <section className="landing-theme w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
      <Hero />
      <Work />
    </section>
  );
};

export default HomePage;
