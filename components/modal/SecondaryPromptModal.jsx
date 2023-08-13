/* eslint-disable @next/next/no-html-link-for-pages */
import { Dialog, Transition } from '@headlessui/react';
import { NFTStorage, File } from 'nft.storage';
import { Fragment, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useAccount, useNetwork } from 'wagmi';
import Link from 'next/link';
import AvalonV3 from '@/abi/AvalonV3.json';
import AvalonPromptMarketplace from '@/abi/AvalonPromptMarketplace.json';
import { config } from '@/abi';
import { ethers } from 'ethers';

const SecondaryPromptModal = ({ openMintModal, handleOnClose, prompt }) => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const [hasListed, setHasListed] = useState(true);
  const [nftName, setNftName] = useState('');
  const [promptNftName, setPromptNftName] = useState('');
  const [promptNftDescription, setPromptNftDescription] = useState('');
  const [attr, setAttr] = useState(
    JSON.stringify([
      { trait_type: 'model', value: 'Stable Diffusion' },
      { trait_type: 'creator', value: '' },
      { trait_type: 'chain', value: '' },
      { trait_type: 'prompts', value: '' },
    ])
  );
  const [base64Image, setBase64Image] = useState(null);
  const [maxSupply, setMaxSupply] = useState(1);
  const [price, setNftPrice] = useState();

  const apiKeys = process.env.NEXT_PUBLIC_NFTSTORAGE_TOKEN;

  const handleGenerateImage = async (e) => {
    e.preventDefault();
    // setIsGenerating(true);
    const token = process.env.NEXT_PUBLIC_SD_API_KEY;
    const modelId = 'stable-diffusion-xl-beta-v2-2-2'; // chosen model id
    const apiHost = 'https://api.stability.ai';

    const mintNotification = toast.loading(
      'Please wait! Generating your AI Image'
    );

    try {
      const response = await axios({
        method: 'POST',
        url: `${apiHost}/v1/generation/${modelId}/text-to-image`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 512,
          samples: 1,
          steps: 150,
          style_preset: 'neon-punk',
        }),
      });

      // use the response here
      console.log(response.data);
      if (
        response.data &&
        response.data.artifacts &&
        response.data.artifacts[0].base64
      ) {
        setBase64Image(response.data.artifacts[0].base64);
      }
      // Show success message to the user
      toast.update(mintNotification, {
        render: 'Creation Completed Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 7000,
      });
      //   setIsGenerating(false);
      //   setGenerationComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const CreateNFT = async (e) => {
    e.preventDefault();

    let base64String = base64Image;

    let imageType = 'image/jpeg';

    // We convert the base64 string to a blob
    let blob = base64ToBlob(base64String, imageType);

    let parsedAttr = JSON.parse(attr);
    parsedAttr[3].value = prompt;

    parsedAttr[2].value = chain.name;
    setAttr(JSON.stringify(parsedAttr));

    parsedAttr[1].value = address;
    setAttr(JSON.stringify(parsedAttr));

    const mintNotification = toast.loading(
      'Please wait! Tokenizing your Prompt NFT'
    );

    try {
      const client = new NFTStorage({ token: apiKeys });
      const imageFile = new File([blob], 'image.jpg', {
        type: imageType,
      });

      const metadata = await client.store({
        name: promptNftName,
        description: promptNftDescription,
        image: imageFile,
        attributes: parsedAttr,
      });

      console.log(metadata.url);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tokenUri = 'ipfs://' + metadata + '/metadata.json';

      const royaltyFee = 10;

      // Convert royalty fee to wei
      const royaltyFeeWei = ethers.utils.parseUnits(royaltyFee.toString(), 2);

      const nftPromptFactory = new ethers.Contract(
        config.avalonV3,
        AvalonV3,
        signer
      );

      const createPromptNft = await nftPromptFactory.createNFT(
        maxSupply,
        metadata.url,
        ethers.utils.parseEther(price)
      );

      const receipt = await createPromptNft.wait();
      console.log('createPromptNft: ', await createPromptNft.hash);
      console.log('receipt: ', receipt);

      // Show success message to the user
      toast.update(mintNotification, {
        render: 'Creation Completed Successfully',
        type: 'success',
        isLoading: false,
        autoClose: 7000,
      });

      setTxHash(createPromptNft.hash);
      setHasListed(true);
      setPromptNftName('');
      setPromptNftDescription('');
      setMaxSupply('');
      setNftPrice('');
    } catch (error) {
      console.log(error);
    }
  };

  function base64ToBlob(base64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  }

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
                <Dialog.Panel className="w-[1000px] h-[570px] transform overflow-hidden rounded-2xl  bg-black/90 border border-gray-400 p-6 text-center align-middle shadow-xl transition-all">
                  {hasListed ? (
                    <div className=" text-xl font-bold text-gray-300 mt-[130px]">
                      Success! Your Secondary prompt NFT has been Created!
                      <div className="text-xl text-purple-500 flex flex-col items-center justify-center">
                        <IoCheckmarkCircleOutline className="text-[200px] " />
                        <div className="text-center mt-4">
                          <Link href="/profile">
                            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                              View in Profile
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-medium leading-6 text-center py-4 text-gray-300 "
                      >
                        Generate a Secondary Prompt Image
                      </Dialog.Title>

                      <div className="flex items-center mt-2">
                        <div className="">
                          <img
                            src={`data:image/jpeg;base64,${base64Image}`}
                            alt=""
                            className="w-[430px] h-[400px] rounded-xl"
                          />
                          <button
                            className="text-white bg-transparent hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-white mt-4 border-2 border-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-transparent "
                            onClick={handleGenerateImage}
                          >
                            Utilize Prompt
                          </button>
                        </div>
                        <div className="mt-4 flex gap-2 ml-10 text-center items-center justify-center">
                          <form className="ml-[100px] w-[400px] mt-6">
                            <div className="relative z-0 w-full mb-6 group">
                              <input
                                name="floating"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                placeholder=" "
                                required
                                onChange={(e) =>
                                  setPromptNftName(e.target.value)
                                }
                              />
                              <label
                                for="floating"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Prompt NFT Name
                              </label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                              <textarea
                                name="text"
                                id="floating_text"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                placeholder=" "
                                required
                                onChange={(e) =>
                                  setPromptNftDescription(e.target.value)
                                }
                              />
                              <label
                                for="floating_repeat"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Prompt NFT Description (Optional)
                              </label>
                            </div>

                            <div className="relative z-0 w-full mb-6 group">
                              <textarea
                                name="text"
                                id="floating_text"
                                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
                                placeholder=" "
                                required
                                value={prompt}
                              />
                              <label
                                htmlFor="floating_repeat"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                              >
                                Prompt
                              </label>
                            </div>

                            <div class="text-gray-400 flex items-center">
                              <label for="quantity" class="block mb-2">
                                Maximum Supply:
                              </label>
                              &nbsp;&nbsp;
                              <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                max="50000"
                                className="px-4 bg-transparent py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                onChange={(e) => setMaxSupply(e.target.value)}
                              />
                            </div>

                            <div class="text-gray-400 mt-6 flex items-center">
                              <label for="quantity" class="block mb-2 mr-12">
                                NFT Price:
                              </label>
                              &nbsp;&nbsp;
                              <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="0.001"
                                step="0.001"
                                className="px-4 bg-transparent py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                onChange={(e) => setNftPrice(e.target.value)}
                              />
                            </div>

                            <button
                              type="submit"
                              className="text-white bg-purple-700 mt-5 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                              onClick={CreateNFT}
                            >
                              Create
                            </button>
                          </form>
                        </div>
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

export default SecondaryPromptModal;
