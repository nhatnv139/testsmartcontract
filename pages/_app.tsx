import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
const inter = Lexend({ subsets: ["latin"] });
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { Lexend } from "next/font/google";
import React, { useEffect } from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
  bsc,
  bscTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { appWithTranslation } from 'next-i18next';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    bsc,
    bscTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <AppRouterCacheProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={midnightTheme()}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </AppRouterCacheProvider>
      <ToastContainer />
    </>
  );
}

export default appWithTranslation(MyApp) ;
