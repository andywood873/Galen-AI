/* eslint-disable @next/next/no-html-link-for-pages */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import Link from 'next/link';

const ListNftModal = ({
  openMintModal,
  handleOnClose,
  nftName,
  nftAddress,
}) => {
  const [data, setData] = useState(null);
  const [minted, setMinted] = useState();
  const [saveMinted, setSaveMinted] = useState();
  const [nftPrice, setNftPrice] = useState(0.001);
  const [network, setNetwork] = useState('zora');
  const [hasListed, setHasListed] = useState(false);

  return (
    <>
      <Transition appear show={openMintModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-serif"
          onClose={handleOnClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl py-20 bg-black/70 border border-gray-400 p-6 text-center align-middle shadow-xl transition-all">
                  {hasListed ? (
                    <div className=" text-xl font-bold text-gray-300">
                      Success! Your Prompt has been listed!
                      <div className="text-xl text-purple-500 flex flex-col items-center justify-center">
                        <IoCheckmarkCircleOutline className="text-[200px] " />
                        <div className="text-center mt-4">
                          <Link href="/explore">
                            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                              View on Marketplace
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-center py-4 text-gray-300 "
                      >
                        List <span className="gradient-text">{nftName}</span> on
                        the Prompt Marketplace
                      </Dialog.Title>

                      <div className="mt-4 flex gap-2 w-full text-center items-center justify-center">
                        <form className=" rounded max-w-sm mx-auto">
                          <label className="text-gray-300 align-start flex mb-2">
                            Set Price(in ETH):
                          </label>
                          <input
                            type="number"
                            id="price"
                            name="price"
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            min="0.001"
                            step="0.001"
                            onChange={(e) =>
                              setNftPrice(Number(e.target.value))
                            }
                          />
                          <button
                            type="submit"
                            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 mt-6"
                          >
                            Continue
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <ToastContainer />
        </Dialog>
      </Transition>
    </>
  );
};

export default ListNftModal;
