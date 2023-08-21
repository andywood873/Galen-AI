import "@/styles/globals.css";
import { darkTheme } from "@rainbow-me/rainbowkit";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import merge from "lodash.merge";
import { FormProvider } from "@/context/formContext";

const AvalancheTestnet = {
  id: 43113,
  name: "Avalanche Fuji Testnet",
  network: "avalanche-testnet",
  iconUrl: "https://avatars.githubusercontent.com/u/60056322?s=280&v=4",
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

const { provider, chains } = configureChains(
  [AvalancheTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Galen",
  chains,
});

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
          <Component {...pageProps} />
        </FormProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
