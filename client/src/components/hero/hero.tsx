import { FaLocationArrow } from "react-icons/fa6";

import { TextGenerateEffect } from "@/components/ui/aceternity/text-generate-effect";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import MagicButton from "@/components/ui/custom/magic-button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const Hero = () => {
  const { userId } = auth();
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="silver"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="gray" />
      </div>
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Upload your pdf!
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <TextGenerateEffect
            words="We serve service for your better."
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Your QChatAi Assistant. How can I help you today?
          </p>
          {userId ? (
            <a href="/start">
              <MagicButton
                title="Let's Start"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          ) : (
            <a href="/sign-up">
              <MagicButton
                title="Sign up"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
