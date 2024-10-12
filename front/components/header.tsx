import { useState, useEffect } from "react";
import Image from "next/image";

export function Header() {
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

  return (
    <div className="flex items-center justify-between h-[8vh] border-b-2 border-black w-[95vw]">
      <div className="text-4xl font-bold flex items-center gap-2">
        <Image src={`/logo.svg`} alt="logo" width={35} height={35} />
        SuiPaper
      </div>

      <div className=" items-center flex gap-1 justify-center ">
        <div>Lausanne</div>
        <div className="pt-2">*</div>
        <div>{currentTime}</div>
      </div>
    </div>
  );
}
