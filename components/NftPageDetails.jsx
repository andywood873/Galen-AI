/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { ethers } from 'ethers';
import { config } from '@/abi';
import AvalonV3 from '@/abi/AvalonV3.json';
import { formatAddress } from '@/utils/formatAddress';
import { formatDate } from '@/utils/formatDate';
import Link from 'next/link';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PromptDetails from './PromptDetails';

const nftAddress = config.avalonV3;

const NftPageDetails = ({
  price,
  date,
  image,
  name,
  description,
  attributes,
  creator,
  owner,
  tokenId,
}) => {
  //   const solPrice = useSolPrice();
  const [openModal, setOpenModal] = useState(false);
  const [maxSupply, setMaxSupply] = useState(0);
  const [ethPrice, setEthPrice] = useState();

  const getSupply = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.mode.network/'
    );

    const supplyGetterContract = new ethers.Contract(
      config.avalonV3,
      AvalonV3,
      provider
    );

    const getTokenSupply = await supplyGetterContract.getMaxSupply(tokenId);
    console.log(getTokenSupply);
    const bigNumber = ethers.BigNumber.from(getTokenSupply._hex);
    const supplyValue = bigNumber.toNumber();
    setMaxSupply(supplyValue);
  };

  const getTokenPrice = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://sepolia.mode.network/'
    );

    const priceGetterContract = new ethers.Contract(
      config.avalonV3,
      AvalonV3,
      provider
    );

    const getTokenPrice = await priceGetterContract.getPrice(tokenId);
    console.log(getTokenPrice._hex);
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

  useEffect(() => {
    getSupply();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOnClose = () => {
    setOpenModal(false);
  };

  //   const balanceInUsd = solPrice
  //     ? (parseFloat(price) * solPrice).toFixed(2)
  //     : '---';

  const prompt = (attributes && attributes[1] && attributes[1].value) || null;

  console.log(attributes);

  const mintNft = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex">
        <div className="w-[100%] mr-20">
          <img
            src={image}
            alt=""
            className="rounded-xl w-[500px] h-[420px] ml-[100px] mt-6"
          />

          <div className="flex flex-col justify-center ml-[100px] mt-6 text-gray-300">
            <div className="flex justify-center gap-4 border-b-2 border-gray-500">
              <h1>Creator Address:</h1>
              {/* <p>{owner && formatAddress(owner)}</p> */}
            </div>

            <div className="flex justify-center gap-4 mt-3 border-b-2 border-gray-500">
              <h1 className>Date Created:</h1>
              {/* <p>{date && formatDate(date)}</p> */}
            </div>

            <div className="flex justify-center gap-4 mt-3 border-b-2 border-gray-500">
              <h1>NFT Address:</h1>
              <p>{nftAddress && formatAddress(nftAddress)}</p>
            </div>
          </div>
        </div>

        <div className="text-gray-300 mt-6 ml-20">
          <div>
            <Link href="/explore">
              <p className="flex items-center text-[13px] text-purple-600 font-bold">
                <FaLongArrowAltLeft className="text-2xl " />
                &nbsp;Return to explore
              </p>
            </Link>
            <h1 className="text-2xl capitalize">{name}</h1>
            <p className="flex items-center text-gray-500 py-2">
              <AiOutlineEye className="text-xl" />
              <span className="text-sm"> 12</span>
            </p>
            <h4 className="w-[700px] text-gray-400 italic">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
              similique ullam! Harum doloremque, sequi impedit ipsum voluptate
              numquam quisquam autem dolor.
            </h4>
          </div>

          <div className="text-gray-300 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 italic">
            <div className="glassmorphism p-4 text-start w-[210px] italic">
              <h1 className="font-bold">Content Type:</h1>
              <p>Prompt</p>
            </div>
            <div className="glassmorphism p-4 text-start w-[210px]">
              <h1 className="font-bold">Category:</h1>
              <p>Generative Art</p>
            </div>
            <div className="glassmorphism p-4 text-start w-[210px]">
              <h1 className="font-bold">AI Model:</h1>
              <p>
                {attributes && attributes[0] ? attributes[0].value : 'Dall-E'}
              </p>
            </div>
            <div className="glassmorphism p-4 text-start w-[210px]">
              <h1 className="font-bold">Chain:</h1>
              <p>Mode</p>
            </div>
            <div className="bg-black/60 border shadow-2xl border-gray-400 p-4 text-start w-[210px]">
              <h1 className="font-bold">Max Supply:</h1>
              {maxSupply && <p>{maxSupply}</p>}
            </div>
          </div>

          <div className="text-white mt-10 bg-black/30">
            <h2 className="flex items-center text-xl text-gray-300 ">
              Primary Market &nbsp;
              <BsFillPatchQuestionFill />
            </h2>
            <div className="border w-[600px] border-gray-300 MT-6" />
            <p className="text-xl my-4 text-gray-200 text-[17px]">
              <span className="">Price:</span> {ethPrice} ETH &nbsp;
              {/* <span className="text-[16px] text-gray-300">
                ~(${balanceInUsd})
              </span> */}
            </p>

            <div className="w-full">
              <button
                type="submit"
                className="text-white bg-gradient-to-r w-full from-indigo-500 via-purple-500 to-pink-500 text-lg font-bold hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg  sm:w-auto  py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 px-[280px]"
                onClick={mintNFT}
              >
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
      <PromptDetails />
      {/* <TransferModal
        openMintModal={openModal}
        handleOnClose={handleOnClose}
        nftAddress={nftAddress}
      />  */}
      <ToastContainer />
    </>
  );
};

export default NftPageDetails;
