"use client";
import Image from "next/image";

import { Header } from "@/components/header";

import { ConnectButton } from "@mysten/dapp-kit";

export function Login() {
  return (
    <div className="w-full h-[100vh] flex-col flex relative overflow-hidden items-center justify-start">
      <Header />
      <Image
        src={`/ill1.svg`}
        alt="video"
        width={500}
        height={500}
        className="absolute -bottom-[30vh] right-16"
      />
      <div className="absolute top-1/2 left-24 flex items-center gap-8 -translate-y-1/2">
        {/* <Image src={`/shape.svg`} alt="shape" width={50} height={50} />
        <div className="text-4xl">
          A new way to <br />
          <span className="font-black ml-32">Access</span> news.
        </div> */}
        <div className="text-4xl">
          A new way to
          <span className="font-black"> Access</span> news.
        </div>
      </div>
      <div className="absolute bottom-1/4 left-48">
        <ConnectButton />
        {/* <Button className="absolute bottom-1/4 left-48 text-2xl font-extrabold px-16 py-6">
          Login
        </Button> */}
      </div>
    </div>
  );
}
