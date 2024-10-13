"use client";

import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import HomePage from "./home-page";
import Stake from "./stake";
import { useEffect } from "react";
import { Header } from "./header";
import { eventEmitter } from "@/utils/eventEmitter";

export default function Home() {
  const account = useCurrentAccount();

  const { data: balanceData, refetch: refetchBalance } = useSuiClientQuery(
    "getAllBalances",
    {
      owner: account?.address as string,
    }
  );

  useEffect(() => {
    const handleStakeSuccess = () => {
      refetchBalance();
    };

    eventEmitter.on("stakeSuccess", handleStakeSuccess);

    return () => {
      eventEmitter.off("stakeSuccess", handleStakeSuccess);
    };
  }, [refetchBalance]);

  return (
    <div>
      <Header />
      {/* {account && (
        <div>
          {account.address}
          {data.data.length === 0 ? (
            <div>No objects owned by the connected wallet</div>
          ) : (
            <div>Objects owned by the connected wallet</div>
          )}
          {data.data.map((object) => (
            <div key={object.data?.objectId}>
              <div>Object ID: {object.data?.objectId}</div>
            </div>
          ))}
        </div>
      )} */}
      {balanceData &&
      parseFloat(
        balanceData.find(
          (coin) =>
            coin.coinType ===
            "0xecab4cedfd51fa77cc1dbb9aa6c012773320d4b304553369ed5d4e75376c02e7::farm::FARM"
        )?.totalBalance || "0"
      ) /
        1e9 >=
        1 ? (
        <div className="flex items-center justify-center w-full h-full">
          <HomePage />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[90vh]">
          <Stake />
        </div>
      )}
    </div>
  );
}
