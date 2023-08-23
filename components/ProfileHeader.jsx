/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';
import { GoVerified } from 'react-icons/go';
import { MdContentCopy } from 'react-icons/md';
import { AiOutlineUpload } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from 'react-icons/bs';
import { useAccount } from 'wagmi';
import { formatAddress } from '@/utils/formatAddress';
import { useEffect, useState } from 'react';

const ProfileHeader = () => {
  const { address } = useAccount();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <div className=" mt-[2px]  md:flex-row flex-col shadow-2xl ">
          <img src="profile-bg8.jpg" alt="" className="w-screen h-[220px]" />

          <div className="bg-black border border-gray-500 w-[62rem] absolute top-[180px] h-[240px] mx-[190px] z-10 mb-20 shadow-2xl rounded-[50px]">
            <div className="flex gap-6">
              <img
                src="roko.jpg"
                alt=""
                className="w-[150px] h-[160px] rounded-md mt-10 ml-12  "
              />
              <div className="text-white mt-10">
                <div className="font-bold flex justify-between">
                  <div className="flex gap-2 text-2xl">
                    <h1>User</h1>
                    <GoVerified className="text-purple-600 font-bold text-3xl mb-2" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-md px-5 py-2.5 mb-2"
                    >
                      Follow
                    </button>
                    <AiOutlineUpload className="text-4xl border-gray-300 border p-1 rounded-full mb-2" />
                    <FiMoreHorizontal className="text-4xl border-gray-300 border p-1 rounded-full mb-2" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-md text-gray-400 font-bold">
                    {address && formatAddress(address)}
                  </p>
                  <MdContentCopy className="text-gray-300 text-xl cursor-pointer" />
                </div>
                <div>
                  <p className="text-gray-300 w-[700px] my-2">
                    Currently exploring the amazing world of NFTs and
                    Blockchain!!!
                  </p>
                </div>
                <div className="mt-3">
                  <ul className="flex items-center text-xl gap-4 text-gray-300">
                    <li>
                      <BsFacebook />
                    </li>
                    <li>
                      <BsTwitter />
                    </li>
                    <li>
                      <BsLinkedin />
                    </li>
                    <li>
                      <BsInstagram />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* <div>
        <TabHeadless />
      </div> */}
        </div>
      </>
    )
  );
};

export default ProfileHeader;
