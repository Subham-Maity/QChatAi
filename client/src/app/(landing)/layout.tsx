import React from "react";
import Navbar from "@/components/hero/navigation/navbar";

interface Props {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="landing-theme flex flex-col items-center w-full landing-theme ">
      <Navbar />
      {children}
    </div>
  );
};

export default MarketingLayout;
