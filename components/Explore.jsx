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
        {/* <PromptCard
          img=""
          name=""
          model=""
          owner=""
          price=""
          nftAddress=""
        /> */}
      </div>
    </>
  );
};

export default React.memo(Explore);
