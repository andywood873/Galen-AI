import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLock } from 'react-icons/ai';
import { useAccount } from 'wagmi';
import extractStrings from '@/utils/extractStrings';
import { config } from '@/abi';
import SecondaryPromptModal from './modal/SecondaryPromptModal';

const PromptDetails = ({ tokenId, attributes }) => {
  const { isConnected, address } = useAccount();
  const nftPrompt = attributes[3].value;
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const API_URL = `https://sepolia.explorer.mode.network/api/v2/tokens/${config.avalonV3}/instances/${tokenId}/holders`;

  const [hasAccess, setHasAccess] = useState(false);
  const [result, setResult] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);

      // Parse the response to retrieve the ERC1155 tokens
      const tokens = response.data.items;

      console.log(tokens);
      const tokenWithUserAddress = tokens.find(
        (token) => token.address.hash.toLowerCase() === address.toLowerCase()
      );

      if (tokenWithUserAddress) {
        setHasAccess(true);
        console.log('Has access');
      } else {
        setHasAccess(false);
        console.log('No access');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address]); // Call fetchData whenever the address changes

  return (
    <>
      <div className="mx-20">
        {hasAccess ? (
          <div className="text-gray-300 w-full flex-col items-center justify-center text-center mt-[100px] mb-[200px] border border-gray-400 rounded-full py-20 px-16 shadow-2xl">
            <div className="text-white">
              {attributes && attributes[3] ? attributes[3].value : ''}
            </div>

            <div className="mt-4">
              <button
                className="text-white bg-purple-500 text-md font-bold hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg  sm:w-auto  py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 px-8"
                onClick={handleOpenModal}
              >
                Generate Secondary Prompt
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-300 w-full flex-col items-center justify-center text-center mt-[100px] mb-[200px] glassmorphism4 py-20 ">
            <div>
              <p>
                <AiOutlineLock className="w-full text-6xl" />
                <span className="text-lg">
                  You currently do not have access to this prompt
                </span>
                <br />
                <br />
                <span className="">Buy NFT to get access</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <SecondaryPromptModal
        openMintModal={openModal}
        handleOnClose={handleCloseModal}
        prompt={attributes && attributes[3] ? attributes[3].value : ''}
      />
    </>
  );
};

export default PromptDetails;
