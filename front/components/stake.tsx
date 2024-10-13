"use client";
import { Button } from "@/components/ui/button";
import { Transaction } from "@mysten/sui/transactions";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { useCallback } from "react";
import {
  TREASURY,
  USER_STATE,
  REWARD_STATE,
  COIN_TREASURY_CAP,
} from "@/config";
import { eventEmitter } from "@/utils/eventEmitter";

export default function Stake() {
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

  const stake = useCallback(() => {
    if (!ownedObjects || ownedObjects.data.length === 0) {
      console.error("No owned objects found");
      return;
    }

    const lastObjectId =
      ownedObjects.data[ownedObjects.data.length - 1].data?.objectId;

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
    <Button onClick={stake} className="text-2xl font-extrabold px-16 py-6">
      Stake
    </Button>
  );
}
