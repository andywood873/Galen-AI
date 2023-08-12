import React, { useEffect, useState } from 'react';
import PromptCard from './cards/PromptCard';
import ExploreTab from './tab/ExploreTab';
import { formatAddress } from '@/utils/formatAddress';
import axios from 'axios';
import AvalonPromptMarketplace from '@/abi/AvalonPromptMarketplace.json';
import { ethers } from 'ethers';
import { config } from '@/abi';
import convertArrayToObject from '@/utils/convertToObject';

const Explore = () => {
  const [listedNFTs, setListedNFTs] = useState([]);

  const getAllNFTs = async (tld) => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.mode.network/'
    );

    const nftGetterContract = new ethers.Contract(
      config.avalonPromptMarketplace,
      AvalonPromptMarketplace,
      provider
    );

    const listed = await nftGetterContract.getListedTokens();
    const stringifiedListed = JSON.stringify(listed);
    console.log(stringifiedListed);
    if (stringifiedListed && stringifiedListed.length > 0) {
      // Check if there's an actual response
      const parsedListed = JSON.parse(stringifiedListed);
      const convertedNFTs = convertArrayToObject(parsedListed);
      setListedNFTs(convertedNFTs);
    }
  };

  useEffect(() => {
    getAllNFTs();
  }, []);

  return (
    <>
      <h1 className="text-center text-xl text-white mt-6 gradient-text">
        Explore Prompts
      </h1>
      <div className="ml-[60px]">
        <ExploreTab />
      </div>
      <div className="grid grid-cols-5 gap-6 mt-4 mx-[60px]">
        {/* <p className="text-white">{JSON.stringify(listedNFTs)}</p> */}
        {listedNFTs.length > 0 && // Check if the array is not empty
          listedNFTs.map((nft, index) => (
            <PromptCard
              key={index}
              tokenId={nft.tokenID} // Access the tokenId property
              seller={nft.address} // Access the address property
              price={nft.price} // Access the price property
            />
          ))}
      </div>S
    </>
  );
};

export default React.memo(Explore);
