import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLock } from 'react-icons/ai';
import extractStrings from '@/utils/extractStrings';

// const doesSymbolExistInResult = (result, symbol) => {
//   return result.some((nft) => nft.symbol === symbol);
// };

const PromptDetails = ({ symbol, prompt, owner }) => {
  const [decryptedPrompt, setDecryptedPrompt] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [result, setResult] = useState([]);

  return (
    <>
      {/* Just replace prompt with decryptedPrompt in your return JSX */}
      <div className="mx-20">
        {hasAccess ? (
          <div className="text-gray-300  w-full flex-col items-center justify-center text-center mt-[100px] mb-[200px]  glassmorphism py-20 ">
            <div className="text-white">
              <p>Yayyyyy</p>
            </div>
          </div>
        ) : (
          <div className="text-gray-300  w-full flex-col items-center justify-center text-center mt-[100px] mb-[200px]  glassmorphism py-20 ">
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
    </>
  );
};

export default PromptDetails;
