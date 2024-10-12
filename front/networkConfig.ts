import { getFullnodeUrl } from "@mysten/sui/client";
import { PACKAGE } from "@/config";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        counterPackageId: PACKAGE,
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
