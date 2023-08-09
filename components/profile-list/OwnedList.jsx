import { useEffect, useState } from 'react';
import axios from 'axios';
import OwnedCard from '../cards/OwnedCard';

const OwnedList = () => {
  const [result, setResult] = useState([]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mx-8">
      <OwnedCard
        img="3.jpg"
        name="Hell Abyss"
        model="Stable Diffusion"
        owner="0x4352...77"
        nftAddress="0x737849..."
      />
    </div>
  );
};

export default OwnedList;
