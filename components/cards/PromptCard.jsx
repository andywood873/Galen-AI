/* eslint-disable @next/next/no-img-element */
import { formatAddress } from '@/utils/formatAddress';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import AvalonV3 from '@/abi/AvalonV3.json';
import AvalonPromptMarketplace from '@/abi/AvalonPromptMarketplace.json';
import { config } from '@/abi';
import { useAccount, useBalance } from 'wagmi';

const modeAddress = config.avalonV3;
const zoraAddress = config.avalonV2;

const getRandomWord = () => {
  const words = ['Rare', 'Common'];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const getChainImage = (chainAddress) => {
  if (chainAddress === modeAddress) {
    return 'https://png.pngtree.com/thumb_back/fh260/background/20210707/pngtree-golden-yellow-gradient-abstract-art-background-image_736275.jpg';
  } else if (chainAddress === zoraAddress) {
    return 'zora.png';
  } else {
    return '3.jpg';
  }
};

const PromptCard = ({
  tokenId,
  seller,
  price,
  model,
  img,
  name,
  chainAddress,
}) => {
  const [ethPrice, setEthPrice] = useState();
  const { address, isConnected } = useAccount();

  // console.log(chain);

  const chainImg = getChainImage(chainAddress);

  // console.log(tokenId);

  const getTokenPrice = async (e) => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.mode.network/'
    );

    const priceGetterContract = new ethers.Contract(
      config.avalonV3,
      AvalonV3,
      provider
    );

    const getTokenPrice = await priceGetterContract.getPrice(tokenId);
    // console.log(getTokenPrice._hex);
    const bigNumber = ethers.BigNumber.from(getTokenPrice._hex);
    const ethValue = ethers.utils.formatEther(bigNumber);
    setEthPrice(ethValue);
  };

  const mintNFT = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const mintPromptContract = new ethers.Contract(
      config.avalonV3,
      AvalonV3,
      signer
    );

    const mintAmount = ethers.utils.parseEther(ethPrice.toString());

    const mintPromptNFT = await mintPromptContract.mint(tokenId, {
      value: mintAmount,
    });
    const receipt = await mintPromptNFT.wait();
    console.log('mintPromptNFT: ', await mintPromptNFT.hash);

    console.log('receipt: ', receipt);
  };

  useEffect(() => {
    getTokenPrice();
  }, []);

  return (
    <div className="border-gradient relative mb-10 flex justify-center items-center rounded-lg">
      <div className="w-full p-2 h-full cursor-pointer overflow-hidden rounded-2xl flex flex-col items-center bg-black">
        <Link href="/details/[id]" as={`/details/${tokenId}`}>
          <img
            src={img}
            alt=""
            className="w-[250px] h-[300px] object-cover rounded-[30px] transition-all duration-500 hover:opacity-90 pt-2"
          />
        </Link>

        <div className="flex items-center justify-between gap-4 w-full">
          <div className="w-full">
            <div>
              <img
                src={chainImg}
                alt=""
                className="w-[34px] h-[35px] p-1 absolute top-4 right-7 bg-purple-800 rounded-2xl"
              />
            </div>

            <span className="text-gray-300 absolute top-4 left-4 bg-purple-700 p-1 px-4 text-sm rounded-full font-bold">
              {model}
            </span>

            <h3 className="mt-1 text-md text-center font-bold text-gray-300 w-full pt-2">
              {name}
            </h3>
            <div className="flex items-center justify-between mt-1 text-gray-300">
              <div className="flex items-center justify-center w-full">
                <span className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
                &nbsp;&nbsp;
                <div className="flex flex-col" onClick={mintNFT}>
                  {seller && formatAddress(seller)}
                </div>
              </div>
            </div>

            <div className="flex justify-center text-gray-300 gap-12 pt-2">
              <div className="flex flex-col">
                <p>Price:</p>
                <p>{ethPrice} ETH </p>
              </div>
              <div className="flex flex-col">
                <p>Rarity:</p>
                <p>{getRandomWord()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
