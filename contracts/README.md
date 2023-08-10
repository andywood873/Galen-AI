# LeXar Smart Contracts

LeXar Domains is a decentralized application (dApp) that empowers communities to create and manage custom decentralized top-level domains (dTLDs) on the Gnosis blockchain, all without writing a single line of code.

LeXar is designed to provide an intuitive, user-friendly interface that simplifies the process of creating and managing dTLDs, making it accessible to everyone, regardless of their technical background.

## Links
[Website](https://lexar-frontend.vercel.app/) | [Documentation](https://lexar-domains.gitbook.io/introduction/introduction/introduction)

## Smart Contract Links
- Metadata Address: https://blockscout.chiadochain.net/address/0xf7227a4251cB576eA97411921431415a3D4e7Fa8
- Forbidden TLDS: https://blockscout.chiadochain.net/address/0xa41479c683B534712b4a1686e545160E7710f4be
- Domain Hub:https://blockscout.chiadochain.net/address/0xbBda4a2Ccfe6d31422BCc740aea0c304C5c3613C
- Domain Factory: https://blockscout.chiadochain.net/address/0x6B43B05dA3A20AB9dEAf5d3E97C626dc0673F570
- SBT Domain Factory: https://blockscout.chiadochain.net/address/0x1B8b78c884Caa7D7523FE8669768Bfe07b40f770
- Domain Resolver: https://blockscout.chiadochain.net/address/0xdcDF99A8FeC1102AdeA84c4087224Ef2d6BF8B27
- Sbt Resolver: https://blockscout.chiadochain.net/address/0x86e284Ef6002A6f79fc6715303743d48cDB5cf73

## Sponsor's Tech Used
 ### Gateway.fm RPC: 
   - The Lexar is powered by multiple smart contracts, which were deployed using the Gateway.fm RPC provider. 
   - On the Mint Domain Page, an Ethers.js JsonRpcProvider instance is created to connect to the Gnosis Chiado testnet via the Gateway.fm RPC service. This provider is used in the function to interact with smart contracts and retrieve the TLD price for each available domain.

 ### Gnosis Chiado Chain
   - **Testing and development environment**: The Gnosis Chiado testnet was a safe and cost-effective environment for testing and developing the smart contracts powering the LeXar Dapp.
   - **Community engagement and feedback**: We were able to engage with the developer community and gather valuable feedback. By making LeXar dApp accessible on the Gnosis Chiado testnet, we provided other developers and users with the opportunity to interact with LeXar, test its features, and provide suggestions for improvements.

