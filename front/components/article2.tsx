import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

export default function Article1() {
  return (
    <>
      <h1 className="text-5xl font-bold border-l-4 border-black pl-6">
        Sui Becomes a Top 10 DeFi Blockchain in Less Than a Year.
      </h1>
      <h2 className="text-xl font-semibold mt-4">
        Developers on Sui are building products that people are using to address
        real-world challenges, according to Greg Siourounis, Sui&quot;s managing
        director.
      </h2>
      <div className="flex items-start justify-between mt-4">
        <div className="flex items-center gap-2">
          <Image
            src={`/profile/2.png`}
            alt="redbull"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="font-semibold">by val@stashed</div>
        </div>
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <Calendar size={20} strokeWidth={2.5} />
            <div>Sept 08, 2024</div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} strokeWidth={2.5} />
            <div>3 min read</div>
          </div>
        </div>
      </div>
      <div className="text-lg">
        <div className="mt-4 flex items-start justify-between gap-6">
          <Image
            src={`/image/f2.png`}
            alt="redbull"
            width={1000}
            height={1000}
            className="w-[60%] h-auto border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_#000]"
          />
          <div className="w-[40%] h-auto">
            Layer 1 blockchain Sui, created by the team that led Meta&apos;s
            Diem crypto project, climbed into the top 10 decentralized finance
            (DeFi) rankings Tuesday, less than a year after inception, the
            project said.
            <br /> The total value locked (TVL) has jumped by more than 1,000%
            in four months, catapulting the blockchain above more established
            incumbents such as Bitcoin and Cardano, as well as Coinbase&apos;s
            layer-2, Base. The dollar value of cryptocurrencies deposited in its
            decentralized finance (DeFi) protocols topped $430 million, making
            it the 10th-largest blockchain by TVL, Sui said. As of writing, it
            had slipped to No. 11, behind PulseChain, DeFi Llama data show.
          </div>
        </div>
        <div className="mt-4">
          {" "}
          Sui&apos;s mainnet went live in May 2023. It&apos;s a layer-1
          blockchain, much like Ethereum or Bitcoin, but with a specific type of
          proof-of-stake consensus named delegated proof-of-stake. Its native
          token, (SUI), is used for validator and delegator staking, to pay gas
          fees and as a right on governance.
          <br />
          <br /> According to DeFi Llama, at press time, Sui was home to 22 DeFi
          protocols, two of which had a TVL of over $100 million and four
          protocols with more than $40 million each.
          <br />
          <br /> The SUI price surged 109% in January, extending the two-month
          winning streak to hit a record-high $1.65, according to CoinDesk data.
          <br />
          <br /> Early this week, Sui announced integration with
          crypto-compatible payments infrastructure provider Banxa to add
          seamless and low-cost fiat on-ramps. Additionally, Mysten Labs&apos;
          Sui Wallet will facilitate the purchase of SUI tokens through Banxa’s
          fiat on-ramp solution and utilize off-ramp solutions.
        </div>
      </div>
    </>
  );
}
