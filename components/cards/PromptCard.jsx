/* eslint-disable @next/next/no-img-element */
import { formatAddress } from '@/utils/formatAddress';
import React from 'react';
import Link from 'next/link';

const getRandomWord = () => {
  const words = ['Rare', 'Common'];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

const PromptCard = ({
  img,
  name,
  listState,
  owner,
  price,
  model,
  chainImg,
}) => {
  return (
    <div className="border-gradient relative mb-10 flex justify-center items-center rounded-lg">
      <div className="w-full p-2 h-full cursor-pointer overflow-hidden rounded-2xl flex flex-col items-center bg-black">
        <img
          src={img}
          alt=""
          className="w-[250px] h-[300px] object-cover rounded-[30px] transition-all duration-500 hover:opacity-90 pt-2"
        />

        <div className="flex items-center justify-between gap-4 w-full">
          <div className="w-full">
            <div>
              <img
                src={chainImg}
                alt=""
                className="w-[34px] p-1 absolute top-4 right-7 bg-purple-800 rounded-2xl"
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
                <div className="flex flex-col">{owner}</div>
              </div>
            </div>

            <div className="flex justify-center text-gray-300 gap-12 pt-2">
              <div className="flex flex-col">
                <p>Price:</p>
                <p>{price} ETH </p>
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
