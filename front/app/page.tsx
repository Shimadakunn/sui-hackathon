"use client";
import { Header } from "@/components/header";
import { Login } from "@/components/login";

import { useCurrentAccount } from "@mysten/dapp-kit";

export default function Hero() {
  const account = useCurrentAccount();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full w-full absolute top-0 left-0 z-10">
        <Header />
        {account ? <div>Account</div> : <Login />}
      </div>
    </>
  );
}
