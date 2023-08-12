/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { formatAddress } from '@/utils/formatAddress';
import ListNftModal from '../modal/ListNftModal';

const OwnedCard = ({
  img,
  name,
  model,
  owner,
  nftAddress,
  tokenId,
  quantity,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="border-gradient relative mb-10 flex justify-center items-center rounded-lg">
      <div className="w-full h-full cursor-pointer overflow-hidden rounded-2xl p-1 flex flex-col items-center bg-black">
        <img
          src={img}
          alt=""
          className="w-[250px] h-[300px] object-cover rounded-[30px] transition-all duration-500 hover:opacity-90 pt-2"
        />

        <div className="flex items-center justify-between gap-4">
          <div>
            <div>
              <img
                src="sol.png"
                alt=""
                className="w-[27px] absolute top-4 right-7 bg-purple-800 rounded-2xl"
              />
            </div>

            <span className="text-gray-300 absolute top-4 left-4 bg-purple-700 p-1 px-4 text-sm rounded-full font-bold">
              {model}
            </span>

            <h3 className="mt-1 text-md text-center font-bold text-gray-300 w-full pt-2">
              {name}
            </h3>
            <div className="flex items-center justify-between mt-1 text-gray-300">
              <div className="flex items-center justify-between">
                <span className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
                &nbsp;&nbsp;
                <div className="flex flex-col">
                  {owner && formatAddress(owner)}
                </div>
              </div>
            </div>

            <div
              className="flex justify-center text-gray-300 py-2"
              onClick={handleOpenModal}
            >
              <p>List NFT</p>
            </div>
          </div>
        </div>
      </div>
      <ListNftModal
        openMintModal={openModal}
        handleOnClose={handleCloseModal}
        nftName={name}
        nftAddress={nftAddress}
        tokenId={tokenId}
        avalaibleQuantity={quantity}
      />
    </div>
  );
};

export default OwnedCard;
