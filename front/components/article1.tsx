import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

export default function Article1() {
  return (
    <>
      <h1 className="text-5xl font-bold border-l-4 border-black pl-6">
        Oracle Red Bull Racing powered by the worlds fastest blockchain.
      </h1>
      <h2 className="text-xl font-semibold mt-4">
        &quot;Oracle Red Bull Racing was an early adopter of Blockchain
        technology in Formula 1, recognizing its potential to connect fans all
        over the world... Partnering with Sui will elevate that experience,
        making access easier, more secure and engaging.&quot; - Christian
        Horner, Oracle Red Bull Racing Team Principal
      </h2>
      <div className="flex items-start justify-between mt-4">
        <div className="flex items-center gap-2">
          <Image
            src={`/profile/1.png`}
            alt="redbull"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div className="font-semibold">by shima@stashed</div>
        </div>
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <Calendar size={20} strokeWidth={2.5} />
            <div>Oct 12, 2024</div>
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
            src={`/image/f1.jpg`}
            alt="redbull"
            width={1000}
            height={1000}
            className="w-[60%] h-auto border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_#000]"
          />
          <div className="w-[40%] h-auto">
            Formula 1 team Oracle Red Bull Racing announces a multi-year
            partnership with the Layer 1 blockchain Sui.
            <br />
            <br /> The British company Oracle Red Bull Racing announced on
            Thursday that the Sui blockchain is now the official blockchain
            partner of the Formula 1 team.
            <br />
            <br /> Oracle Red Bull Racing was one of the first to adopt
            blockchain technology in Formula 1, recognizing its potential to
            connect fans around the world with the team in a truly unique and
            cutting-edge way.
          </div>
        </div>
        <div className="mt-4">
          {" "}
          &quot;The alliance with Sui will enhance this experience, making
          access easier, safer, and more engaging,&quot; commented Christian
          Horner, Team Principal of Oracle Red Bull Racing. Developed by Mysten
          Labs and often presented as a rival to Aptos because it is based on
          the same programming language, the Sui blockchain made its debut last
          month.
          <br />
          <br />
          Oracle Red Bull Racing stated that it conducted an in-depth market
          study to select the network that would allow fans to &quot;engage in
          new ways.&quot; Like Ethereum, Sui enables the launch of decentralized
          applications.
          <br />
          <br /> &quot;Through this partnership, we can demonstrate the true
          power of blockchain technology, to create communities around new and
          groundbreaking connected experiences,&quot; said Evan Cheng,
          co-founder of Mysten Labs.
          <br />
          <br /> This is not the first time Red Bull Racing, which won the
          Monaco Grand Prix this weekend, has partnered with a player in the
          crypto ecosystem. Last year, the team made the exchange Bybit its
          second sponsor behind Oracle.
        </div>
      </div>
    </>
  );
}
