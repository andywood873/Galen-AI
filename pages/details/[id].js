import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { config } from '@/abi';
import Nav2 from '@/components/layout/Nav2';
import NftPageDetails from '@/components/NftPageDetails';

const NftDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [result, setResult] = useState(null);
  const API_URL = `https://sepolia.explorer.mode.network/api/v2/tokens/${config.avalonV3}/instances/${id}`;

  const fetchData = async (nftId) => {
    try {
      const response = await axios.get(nftId);

      // Parse the response to retrieve the ERC1155 tokens
      const tokens = response.data;
      setResult(tokens);
      console.log(tokens);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(API_URL);
    }
  }, [id]);

  return (
    <>
      <div className="">
        <Nav2 />
        {result && result && (
          <NftPageDetails
            image={result.image_url}
            name={result.metadata.name}
            description={result.metadata.description}
            attributes={result.metadata.attributes}
            tokenId={result.id}
          />
        )}
      </div>
    </>
  );
};

export default NftDetails;
