import React, { useEffect, useState } from "react";
import PromptCard from "./cards/PromptCard";
import ExploreTab from "./tab/ExploreTab";
import { formatAddress } from "@/utils/formatAddress";
import axios from "axios";
import GalenPromptMarketplace from "@/abi/GalenPromptMarketplace.json";
import { ethers } from "ethers";
import { config } from "@/abi";
import convertArrayToObject from "@/utils/convertToObject";

const Explore = () => {
  const [listedNFTs, setListedNFTs] = useState([]);
  const chainName = "avalanche_fuji";
  const API_URL = `https://testnets-api.opensea.io/v2/chain/${chainName}/contract/${config.galenV3}/nfts`;
  const apiKey = "474531d79fc84739a3b03950c9430bda";

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      // Parse the response to retrieve the ERC1155 tokens
      const tokens = response.data.nfts;

      console.log(tokens);
      setListedNFTs(tokens);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
              img={nft.image_url}
              tokenId={nft.identifier} // Access the tokenId property
              // seller={
              //   nft.attributes.find((attr) => attr.trait_type === "creator")
              //     ?.value || "Unknown"
              // }
              // model={
              //   nft.attributes.find(
              //     (attr) => attr.trait_type === "model"
              //   )?.value || "Unknown"
              // }
              name={nft.name}
              chainAddress={nft.address}
              // price={nft.price} // Access the price property
            />
          ))}
      </div>
      S
    </>
  );
};

export default React.memo(Explore);
