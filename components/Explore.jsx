import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import TabHeadless from './tab/Tab';
import { formatAddress } from '@/utils/formatAddress';
import axios from 'axios';

const Explore = () => {
  return (
    <>
      <h1 className="text-center text-xl text-white mt-6 gradient-text">
        Explore Prompts
      </h1>
      <div className="ml-[60px]">
        <TabHeadless />
      </div>
      <div className="grid grid-cols-5 gap-6 mt-4 mx-[60px]">
        <PromptCard
          img="1.jpg"
          name="Kaneki Warrior"
          model="Stable Diffusion"
          owner="0x3647..."
          price="1"
          nftAddress="0x74763"
          chainImg="zora.png"
        />
        <PromptCard
          img="2.jpg"
          name="Hunger Games"
          model="Waifu Diffusion"
          owner="0x3983..."
          price="0.2"
          nftAddress="0x5532"
          chainImg="base.webp"
        />
        <PromptCard
          img="3.jpg"
          name="Infinite Abyss"
          model="Dall-E"
          owner="0x3647..."
          price="1"
          nftAddress="0x74763"
          chainImg="zora.png"
        />
        <PromptCard
          img="4.jpg"
          name="Star Wars Jedi"
          model="Hugging Face"
          owner="0x3647..."
          price="0.03"
          nftAddress="0x74763"
          chainImg="base.webp"
        />
        <PromptCard
          img="5.jpg"
          name="Owl Eyes"
          model="Stable Diffusion"
          owner="0x3647..."
          price="0.001"
          nftAddress="0x74763"
          chainImg="zora.png"
        />
      </div>
    </>
  );
};

export default React.memo(Explore);
