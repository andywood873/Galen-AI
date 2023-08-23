## Galen AI

Galen AI is an innovative AI prompt marketplace built on the Avalanche Fuji Testnet. Drawing inspiration from platforms like Promptbase and PromptHero, Galen AI takes a step further by allowing users to not only generate images using AI models but also convert these images into NFTs.

### Features
- AI-Powered Image Generation: Utilize cutting-edge AI models like Stable Diffusion and DALL·E to transform text prompts into captivating images.

- NFT Creation: Once you're satisfied with the generated image, seamlessly convert it into an NFT. Add essential metadata such as the name, description, and the original prompt used for image generation. You can also specify other parameters like the maximum supply and price of the NFT.

- Tokengated Prompts: In a unique twist, the prompts used for generating images are tokengated. This means only users who purchase the NFT can access the original prompt. This allows them to generate secondary images using the exclusive prompt they've acquired.

- Smart Contract Integration: While the UI integration is still in progress, the underlying smart contract for the marketplace has been successfully built and deployed. The demo version allows users to buy NFTs directly from the NFT smart contract.

- OpenSea API Integration: Galen AI leverages the OpenSea API to fetch all NFT data from the Avalanche testnet. This integration also facilitates the tokengating of prompts.

## Smart Contract Address
- GalenV3: https://testnet.snowtrace.io/address/0xFf6D42E3d686f046E17aDf7322401568009DA1F7

## Tech Stack

| Component             | Technology/Service                                                                                                   | Description                                                                                                                                                                                                                       |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Image Generation**  | [Stable Diffusion](https://stability.ai/stablediffusion) - "stable-diffusion-xl-beta-v2-2-2" release from Stability AI | Utilized for generating high-quality images based on user-defined prompts.                                                                                                                                                       |
| **NFT Metadata Storage** | [NFT.storage](https://nft.storage/)                                                                                   | Employs IPFS to ensure decentralized and persistent storage of prompt NFT metadata.                                                                                                                                              |
| **Smart Contract Development** | [Solidity](https://soliditylang.org/)                                                                                 | Used to craft the ERC1155 Smart Contract that facilitates AI prompt to NFT conversion and underpins the marketplace functionalities.                                                                                              |
|                       | ERC1155 Marketplace                                                                                                   | The smart contract for the marketplace has been built and deployed, but is yet to be implemented in the UI. For the demo, users can create and purchase NFTs directly from the NFT Smart contract.                                                                                                   |
| **NFT Metadata Retrieval** | [OpenSea API](https://docs.opensea.io/reference/api-overview)                                                                                    | Integrated to fetch comprehensive NFT metadata from the Avalanche Fuji blockchain.                                                                                                                                               |
| **Blockchain Interaction** | [Ethers.js](https://docs.ethers.io/)                                                                                  | Facilitates seamless interaction with smart contracts on the Ethereum blockchain.                                                                                                                                                 |
| **Authentication**     | [RainbowKit](https://www.rainbowkit.com/docs/introduction) & [WAGMI](https://wagmi.sh/)                               | Integrated to provide a streamlined and secure sign-in experience.                                                                                                                                                               |


## Getting Started
### Clone the repository
```git clone https://github.com/0xTemplar/Galen-AI.git```

### Navigate to the project directory
`cd Galen-AI`

### Install dependencies
`npm install`

# Start the application
`npm run dev`

