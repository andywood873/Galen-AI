/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from 'react';
import { FormContext } from '@/context/formContext';
import Switch from './Switch';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './modal/ConfirmationModal';

const CreateForm = () => {
  const { base64Image } = useContext(FormContext);
  const [openModal, setOpenModal] = useState(false);
  const [network, setNetwork] = useState('devnet');
  const [promptNftName, setPromptNftName] = useState('');
  const [promptNftSymbol, setPromptNftSymbol] = useState('');
  const [promptNftDescription, setPromptNftDescription] = useState('');
  const [attr, setAttr] = useState(
    JSON.stringify([{ trait_type: 'model', value: 'Stable Diffusion' }])
  );
  const [extUrl, setExtUrl] = useState('https://www.avalon.ai');
  const [prompt, setPrompt] = useState('');
  const [createKey, setCreateKey] = useState('');
  const [maxSupply, setMaxSupply] = useState(0);
  const [royalty, setRoyalty] = useState(99);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('Awaiting Upload');
  const [minted, setMinted] = useState();
  const [saveMinted, setSaveMinted] = useState();
  const [receipt, setReceipt] = useState('');

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <h1 className="text-white text-center font-bold text-2xl gradient-text">
        Tokenize Your Prompt
      </h1>
      <div className="flex gap-[100px]">
        <form className="ml-[150px] w-[400px] mt-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPromptNftName(e.target.value)}
            />
            <label
              for="floating"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prompt NFT Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPromptNftSymbol(e.target.value)}
            />
            <label
              for="floating"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prompt NFT Symbol
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="text"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer"
              placeholder=" "
              required
              onChange={(e) => setPromptNftDescription(e.target.value)}
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
              onChange={(e) => setPrompt(e.target.value)}
            />
            <label
              for="floating_repeat"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prompt
            </label>
          </div>

          <Switch />

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
              class="px-4 bg-transparent py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setMaxSupply(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            onClick={createPromptNft}
          >
            Create
          </button>
        </form>

        <div className="mr-[100px] mt-10">
          <img
            src={`data:image/jpeg;base64,${base64Image}`}
            alt=""
            className="w-[430px] h-[400px] rounded-xl"
          />
        </div>
      </div>
      <ToastContainer />
      <ConfirmationModal
        openMintModal={openModal}
        handleOnClose={handleCloseModal}
        txHash={receipt}
      />
    </>
  );
};

export default CreateForm;
