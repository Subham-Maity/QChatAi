import React from "react";
import Navbar from "@/components/landing/navigation/navbar";
import Footer from "@/components/landing/navigation/footer";

interface Props {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="landing-theme flex flex-col items-center w-full landing-theme ">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
