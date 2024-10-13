"use client";
import "@mysten/dapp-kit/dist/index.css";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const networks = {
  testnet: { url: getFullnodeUrl("testnet") },
};
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider
          stashedWallet={{
            name: "BSA Starter Pack",
            network: "testnet",
          }}
          autoConnect
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
