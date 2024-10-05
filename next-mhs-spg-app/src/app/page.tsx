'use client'
import { cn } from "@/lib/helper/cn";
import { ICONPACK } from "@/registry/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const backgrounds = ['kimbo-1.webp', 'kimbo-2.png', 'kimbo-3.png', 'kimbo-4.jpg', 'kimbo-5.jpeg']
function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function OnBoardingPage() {
  const [current, setCurrent] = useState<number>(0)
  useEffect(() => {
    setInterval(() => {
      const rndInt = randomIntFromInterval(0, backgrounds.length - 1);
      if (rndInt === current) return
      setCurrent(() => rndInt)
    }, 3000)
  }, [current])

  return (
    <div className="h-screen overflow-hidden relative">
      <Image
        onClick={() => {
          setCurrent(() => randomIntFromInterval(0, backgrounds.length - 1))
        }}
        className={
          cn("w-screen h-full object-cover bg-kimbo-red/0 animate-pulse",
            false ? "opacity-30 " : "opacity-75",
            'transition-all delay-75 transform-gpu'
          )}
        src={`/assets/${backgrounds[current]}`}
        alt='KIMBO'
        width={2000}
        height={2000}
      />
      <section className='absolute bottom-5 w-full px-4 flex flex-col space-y-5' >
        <Image className='object-contain' src='/assets/kimbo-logo.png' alt='Kimbo Logo' width={100} height={100} />
        <Link href={'/login'} className='w-full p-2.5 flex items-center justify-between bg-kimbo-red rounded text-white font-semibold'>Sign In <Image src={ICONPACK.chevron.rightDouble} alt='Back' width={24} height={24} /></Link>
      </section>
    </div >
  );
}
