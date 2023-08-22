import "@/styles/globals.css";
import { darkTheme } from "@rainbow-me/rainbowkit";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { coreWallet } from '@rainbow-me/rainbowkit/wallets';
import "@rainbow-me/rainbowkit/styles.css";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import merge from "lodash.merge";
import { FormProvider } from "@/context/formContext";
import { DataProvider } from "@/context/DataContext";

const AvalancheTestnet = {
  id: 43113,
  name: "Avalanche Fuji Testnet",
  network: "avalanche-testnet",
  iconUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "AVAX",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: {
      http: ["https://api.avax-test.network/ext/bc/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Snow Trace",
      url: "https://testnet.snowtrace.io/",
    },
  },
  testnet: true,
};

const Sepolia = {
  id: 11155111,
  name: "Sepolia Testnet",
  network: "sepolia-testnet",
  iconUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [
        "https://eth-sepolia.g.alchemy.com/v2/_WbTkyNvmx_ay8v1kgmIdns9E_Bgu1X1",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Sepolia Etherscan",
      url: "https://sepolia.etherscan.io/",
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [Sepolia, AvalancheTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

const connectors = connectorsForWallets([
  {
    groupName: "Suggested",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: "Galen" }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#A020F0",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme} coolMode>
        <FormProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </FormProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
