import '@/styles/globals.css';
import { darkTheme } from '@rainbow-me/rainbowkit';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  RainbowKitProvider,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import merge from 'lodash.merge';
import { FormProvider } from '@/context/formContext';

const ZoraGoerli = {
  id: 999,
  name: 'Zora Goerli',
  network: 'zora-goerli',
  iconUrl: 'https://avatars.githubusercontent.com/u/60056322?s=280&v=4',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Zora Goerli Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.zora.energy/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Zora-Explorer',
      url: 'https://testnet.explorer.zora.energy/',
    },
  },
  testnet: true,
};

const BaseGoerli = {
  id: 84531,
  name: 'Base Goerli',
  network: 'base-goerli',
  iconUrl:
    'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Base Goerli Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://goerli.base.org/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://goerli.basescan.org/',
    },
  },
  testnet: true,
};

const ModeTestnet = {
  id: 919,
  name: 'Mode Testnet',
  network: 'mode-testnet',
  iconUrl:
    'https://img.freepik.com/free-photo/golden-yellow-seamless-venetian-plaster-background_24972-294.jpg?w=2000',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Mode Sepolia Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia.mode.network/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mode Explorer',
      url: 'https://sepolia.explorer.mode.network/',
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [ZoraGoerli, BaseGoerli, ModeTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Avalon',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#A020F0',
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
