import { useEffect, useState } from 'react';
import axios from 'axios';
import OwnedCard from '../cards/OwnedCard';
import { useAccount } from 'wagmi';

const OwnedList = () => {
  const [result, setResult] = useState([]);
  const { isConnected, address } = useAccount();

  const API_URL = `https://sepolia.explorer.mode.network/api/v2/addresses/${address}/tokens?type=ERC-1155`;

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);

      // Parse the response to retrieve the ERC1155 tokens
      const tokens = response.data.items;

      console.log(tokens);
      setResult(tokens);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address]);

  const targetContractAddress = '0x1D48Ad40dBC52Ae5B4eE35012dFA00Ba4160e239';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mx-8">
      {result
        .filter((token) => token.token.address === targetContractAddress)
        .map((token) => (
          <OwnedCard
            img={token.token_instance.image_url || 'default.jpg'}
            name={token.token_instance.metadata.name || 'Unknown'}
            model={
              token.token_instance.metadata.attributes.find(
                (attr) => attr.trait_type === 'model'
              )?.value || 'Unknown'
            }
            owner={address || 'Unknown'}
            nftAddress={token.token.address || 'Unknown'}
            tokenId={token.token_id || 'Unknown'}
            quantity={token.value || 'Unknown'}
          />
        ))}
    </div>
  );
};

export default OwnedList;
