import React from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen w-full grid justify-items-center">
      {children}
    </main>
  );
};

export default Template;
