"use client";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useCallback, useState } from "react";
import {
  TREASURY,
  USER_STATE,
  REWARD_STATE,
  COIN_TREASURY_CAP,
} from "@/config";

import { Share, Flame, CircleSlash, Sparkles } from "lucide-react";
import Article1 from "./article1";
import Article2 from "./article2";

import { Button } from "@/components/ui/button";
import { eventEmitter } from "@/utils/eventEmitter";

export default function Article() {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  const [firstMintSuccessful, setFirstMintSuccessful] = useState(false);

  const mint = useCallback(() => {
    const tx = new Transaction();

    tx.moveCall({
      target: firstMintSuccessful
        ? `0xdee0fbdec8f95871671e976c0953d70751a0ca1cde44f5c69c7a6f8d48c0530d::my_nft_contractv5::mint2`
        : `0xdee0fbdec8f95871671e976c0953d70751a0ca1cde44f5c69c7a6f8d48c0530d::my_nft_contractv5::mint1`,
      arguments: [],
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          const objectId = result.effects?.created?.[0]?.reference?.objectId;
          console.log(objectId);
          // Set firstMintSuccessful to true after the first successful mint
          if (!firstMintSuccessful) {
            setFirstMintSuccessful(true);
          }
          // Emit an event when staking is successful
          eventEmitter.emit("mintSuccess");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, [signAndExecute, firstMintSuccessful]);

  const { data: ownedObjects } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      filter: {
        MatchAll: [
          {
            StructType: "0x2::coin::Coin<0x2::sui::SUI>",
          },
        ],
      },
      options: {
        showType: true,
        showContent: true,
      },
    },
    {
      enabled: !!account,
    }
  );

  const [stakeSuccessful, setStakeSuccessful] = useState(false);

  const stake = useCallback(() => {
    if (!ownedObjects || ownedObjects.data.length === 0) {
      console.error("No owned objects found");
      return;
    }

    const lastObjectId =
      ownedObjects.data[ownedObjects.data.length].data?.objectId;

    if (!lastObjectId) {
      console.error("Last object ID not found");
      return;
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `0xecab4cedfd51fa77cc1dbb9aa6c012773320d4b304553369ed5d4e75376c02e7::vault::stake`,
      arguments: [
        tx.object(lastObjectId),
        tx.object(COIN_TREASURY_CAP),
        tx.object(USER_STATE),
        tx.object(REWARD_STATE),
        tx.object(TREASURY),
        tx.object("0x6"),
      ],
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          const objectId = result.effects?.created?.[0]?.reference?.objectId;
          console.log(objectId);
          setStakeSuccessful(true);
          // Emit an event when staking is successful
          eventEmitter.emit("stakeSuccess");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, [signAndExecute, ownedObjects]);

  return (
    <div className="w-full pt-8 max-w-6xl mb-8">
      {stakeSuccessful ? <Article2 /> : <Article1 />}

      <div className="flex w-full items-center justify-between mt-6">
        <Button variant="outline">
          Share <Share size={15} strokeWidth={2.5} className="ml-1" />
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="destructive">
            Withdraw{" "}
            <CircleSlash size={15} strokeWidth={2.5} className="ml-1" />
          </Button>
          <Button onClick={mint}>
            Mint NFT <Flame size={15} strokeWidth={2.5} className="ml-1" />
          </Button>
        </div>

        <Button onClick={stake}>
          Stake More <Sparkles size={15} strokeWidth={2.5} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
