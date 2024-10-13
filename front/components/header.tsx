import { useState, useEffect } from "react";
import Image from "next/image";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { formatBalance } from "@/utils/formatBalance";
import { Wallet } from "lucide-react";
import { ConnectButton } from "@mysten/dapp-kit";

export function Header() {
  const account = useCurrentAccount();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime(); // Initial update
    const timerId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  const { data, isPending, isError } = useSuiClientQuery("getAllBalances", {
    owner: account?.address as string,
  });

  return (
    <div className="flex items-center justify-between h-[8vh] border-b-2 border-black w-[95vw]">
      <div className="text-4xl font-bold flex items-center gap-2">
        <Image src={`/farm.svg`} alt="logo" width={35} height={35} />
        SuiPaper
      </div>

      {account && (
        <>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Wallet
                size={16}
                strokeWidth={2.5}
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(account.address);
                }}
              />
              <ConnectButton />
              {/* {account.address.slice(0, 4)}... */}
            </div>
            {data && (
              <div className="flex items-center gap-1">
                <Image src={`/sui.svg`} alt="sui" width={16} height={16} />
                {formatBalance(
                  parseFloat(
                    data.find((coin) => coin.coinType === "0x2::sui::SUI")
                      ?.totalBalance || "0"
                  ) / 1e9,
                  2
                )}
              </div>
            )}
            {data && (
              <div className="flex items-center gap-1">
                <Image src={`/farm.svg`} alt="sui" width={16} height={16} />
                {formatBalance(
                  parseFloat(
                    data.find(
                      (coin) =>
                        coin.coinType ===
                        "0xecab4cedfd51fa77cc1dbb9aa6c012773320d4b304553369ed5d4e75376c02e7::farm::FARM"
                    )?.totalBalance || "0"
                  ) / 1e9,
                  2
                )}
              </div>
            )}
            {isPending && <div>Loading...</div>}
            {isError && <div>Error</div>}
          </div>
        </>
      )}

      <div className=" items-center flex gap-1 justify-center ">
        <div>Lausanne</div>
        <div className="pt-2">*</div>
        <div>{currentTime}</div>
      </div>
    </div>
  );
}
