/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { ethers } from "ethers";
import { config } from "@/abi";
import GalenV3 from "@/abi/GalenV3.json";
import { formatAddress } from "@/utils/formatAddress";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PromptDetails from "./PromptDetails";
import SuccessModal from "./modal/SuccessModal";

const nftAddress = config.galenV3;

const NftPageDetails = ({
  image,
  name,
  description,
  attributes,
  tokenId,
  owner,
  metadata,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [maxSupply, setMaxSupply] = useState(0);
  const [ethPrice, setEthPrice] = useState();
  const [txHash, setTxHash] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getIPFSData = async (ipfsUrl) => {
    // Convert IPFS URL to HTTP URL
    const httpUrl = ipfsUrl.replace("ipfs://", "https://ipfs.io/ipfs/");

    try {
      const response = await axios.get(httpUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching IPFS data:", error);
      return null;
    }
  };

  // Usage
  const getPrompt = async () => {
    const data = await getIPFSData(metadata);
    setPrompt(data.attributes[3].value);
  };

  const getSupply = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.avax-test.network/ext/bc/C/rpc"
    );

    const supplyGetterContract = new ethers.Contract(
      config.galenV3,
      GalenV3,
      provider
    );

    const getTokenSupply = await supplyGetterContract.getMaxSupply(tokenId);
    const bigNumber = ethers.BigNumber.from(getTokenSupply._hex);
    const supplyValue = bigNumber.toNumber();
    setMaxSupply(supplyValue);
  };

  const getTokenPrice = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.avax-test.network/ext/bc/C/rpc"
    );

    const priceGetterContract = new ethers.Contract(
      config.galenV3,
      GalenV3,
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

    const mintNotification = toast.loading("Please wait! Minting a Prompt NFT");

    const mintPromptContract = new ethers.Contract(
      config.galenV3,
      GalenV3,
      signer
    );

    const mintAmount = ethers.utils.parseEther(ethPrice.toString());

    const mintPromptNFT = await mintPromptContract.mint(tokenId, {
      value: mintAmount,
    });
    const receipt = await mintPromptNFT.wait();
    console.log("mintPromptNFT: ", await mintPromptNFT.hash);

    console.log("receipt: ", receipt);

    // Show success message to the user
    toast.update(mintNotification, {
      render: "Successfully Bought NFT Prompt",
      type: "success",
      isLoading: false,
      autoClose: 7000,
    });

    setTxHash(mintPromptNFT.hash);
    setOpenModal(true);
  };

  useEffect(() => {
    getTokenPrice();
    getPrompt();
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

  // console.log(attributes);

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
              {owner && formatAddress(owner)}
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
            <h4 className="w-[700px] text-gray-400 pr-10 italic">
              {description && <p>{description}</p>}
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
              <p>Stable Diffusion</p>
            </div>
            <div className="glassmorphism p-4 text-start w-[210px]">
              <h1 className="font-bold">Chain:</h1>
              <p> Avalanche Fuji Testnet</p>
            </div>
            <div className="bg-black/60 border shadow-2xl border-gray-400 p-4 text-start w-[210px]">
              <h1 className="font-bold">Current Supply:</h1>
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
      <PromptDetails tokenId={tokenId} prompt={prompt} />
      <ToastContainer />
      <SuccessModal
        openMintModal={openModal}
        handleOnClose={handleCloseModal}
        txHash={txHash}
      />
    </>
  );
};

export default NftPageDetails;
