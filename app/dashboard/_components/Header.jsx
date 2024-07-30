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
    <div className="flex justify-between items-center  p-6 bg-secondary shadow-sm">
      <Image src={"/logo.svg"} width={100} height={70} alt="" />
      <ul className="hidden md:flex justify-center items-center gap-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          Dashboard
        </li>
        <Link href={"/questionbank"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path == "/questionbank" && "text-primary font-bold"
            }`}
          >
            Questions
          </li>
        </Link>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/how" && "text-primary font-bold"
          }`}
        >
          How it works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
