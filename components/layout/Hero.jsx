/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Technologies from "../Technologies";

const Hero = () => {
  return (
    <section className="container max-w-[64rem] mx-auto  text-white relative px-6">
      <div className="flex flex-col items-center">
        <p className="w-full text-center text-[32px] leading-[38px] sm:text-7xl sm:leading-[84px] font-bold mt-[calc(128px-96px)] sm:mt-[calc(160px-96px)] transition-all">
          <span className="text-transparent bg-clip-text bg-primer">
            Unleash Your Creativity
          </span>{" "}
          with Galen Generative AI
        </p>
        <p className="max-w-[936px] text-center mt-3 sm:mt-4 text-base sm:text-xl text-gray-170 font-normal transition-all">
          Transform your prompts into digital masterpieces, convert them into
          NFTs, and sell on our marketplace. Explore Premium AI Prompts on
          Galen's Marketplace!
        </p>
        <button
          type="button"
          className="flex justify-center items-center text-white bg-primer rounded-lg px-10 text-base font-bold h-12 sm:h-[60px] min-w-[148px] mt-6 sm:mt-10 horztransition-all z-10"
        >
          <span className="sm:hidden block">Explore</span>
          <span className="hidden sm:block">
            <a href="/explore" target="_blank">
              Explore Now
            </a>
          </span>
        </button>
      </div>

      <Technologies />
    </section>
  );
};

export default Hero;
