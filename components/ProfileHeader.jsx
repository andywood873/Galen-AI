/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import TabHeadless from './tab/Tab';
import { GoVerified } from 'react-icons/go';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi';

const ProfileHeader = () => {
  return (
    <div className=" mt-[2px]  md:flex-row flex-col shadow-2xl ">
      <img src="profile-bg8.jpg" alt="" className="w-screen h-[220px]" />

      <div className="bg-black border border-gray-500 w-[60rem] absolute top-[220px] h-[200px] mx-[200px] z-10 mb-20 shadow-2xl rounded-2xl">
        <div className=" flex  gap-6">
          <img
            src="roko.jpg"
            alt=""
            className="w-[160px] h-[160px] rounded-md mt-5 ml-12  "
          />
          <div className="text-white mt-5  font-bold ">
            <div className="flex gap-2 text-2xl">
              <h1>GhostxD</h1>
              <GoVerified className="text-purple-600 font-bold text-3xl mb-2" />
            </div>
            <p className="text-md text-gray-400">0x3749...778h3</p>
          </div>
        </div>
      </div>

      {/* <div className="">
        <img
          src="roko.jpg"
          alt=""
          className="w-[100px] h-[100px] rounded-md absolute top-[280px] left-[100px] border-4 border-white"
        />
      </div>

      <div>
        <div className="mt-[43px] ml-[68px]">
          <div className="text-white mt-6 flex gap-3">
            <img src="sol.png" alt="" className="w-[30px] h-[25px]" />

            <div>
              <h1 className="font-bold text-lg">Sentinel</h1>
              <p className="text-gray-300 text-md">85x60b43d...y647</p>
              <p className="text-gray-300 text-sm font-bold mt-2">
                Joined July 31st
              </p>
            </div>
          </div>
        </div>

        <div>
          <TabHeadless />
        </div>
      </div> */}
    </div>
  );
};

export default ProfileHeader;
