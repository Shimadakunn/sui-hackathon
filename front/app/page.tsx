"use client";
import { Login } from "@/components/login";
import Home from "@/components/home";

import { useCurrentAccount } from "@mysten/dapp-kit";

export default function Hero() {
  const account = useCurrentAccount();
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {account ? <Home /> : <Login />}
      </div>
    </>
  );
}
