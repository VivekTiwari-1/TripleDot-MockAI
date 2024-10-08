"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  useEffect(() => {}, []);

  return (
    <div className="flex justify-between items-center  p-6 px-24 text-gray-400 bg-slate-950 shadow-sm">
      <Image src={"/logo.svg"} width={100} height={70} alt="" />
      <ul className="hidden md:flex justify-center items-center gap-6">
        <li
          className={`hover:text-gray-300 hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-gray-300 font-bold"
          }`}
        >
          Dashboard
        </li>
        <Link href={"/questionbank"}>
          <li
            className={`hover:text-gray-300 hover:font-bold transition-all cursor-pointer ${
              path == "/questionbank" && "text-primary font-bold"
            }`}
          >
            Questions
          </li>
        </Link>
        <Link href={"/pricing"}>
          <li
            className={`hover:text-gray-300 hover:font-bold transition-all cursor-pointer ${
              path == "/pricing" && "text-primary font-bold"
            }`}
          >
            Upgrade
          </li>
        </Link>
        <Link href={"/community"}>
          <li
            className={`hover:text-gray-300 hover:font-bold transition-all cursor-pointer ${
              path == "/community" && "text-primary font-bold"
            }`}
          >
            Community
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
