"use client";
import Image from "next/image";

import { ConnectButton } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";

export function Login() {
  return (
    <div className="w-full h-full flex-col relative">
      <Image
        src={`/ill1.svg`}
        alt="video"
        width={500}
        height={500}
        className="absolute -bottom-[30vh] right-16"
      />
      <div className="absolute top-1/2 left-24 flex items-center gap-8 -translate-y-1/2">
        <Image src={`/shape.svg`} alt="shape" width={50} height={50} />
        <div className="text-4xl">
          A new way to <br />
          <span className="font-black ml-32">Access</span> news.
        </div>
      </div>
      <ConnectButton />
      <Button className="absolute bottom-48 left-48 text-2xl font-extrabold px-16 py-6">
        Login
      </Button>
    </div>
  );
}
