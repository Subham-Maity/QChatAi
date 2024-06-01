import React from "react";
import Hero from "@/components/hero/hero";
import { FloatingNav } from "@/components/hero/floating-nav";
import { navItems } from "@/data";
import Grid from "@/components/hero/grid";
import Projects from "@/components/hero/project";
import Clients from "@/components/hero/clients";
import Experience from "@/components/hero/experience";
import Approach from "@/components/hero/approach";
import Footer from "@/components/hero/footer";

const HomeLayout = () => {
  return (
    <div>
      <FloatingNav navItems={navItems} />
      <Hero />
      <Grid />
      <Projects />
      <Clients />
      <Experience />
      <Approach />
      <Footer />
    </div>
  );
};

export default HomeLayout;
