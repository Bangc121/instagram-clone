"use client";

import {
  AiFillHome,
  AiOutlinePlusSquare,
  AiOutlineSearch,
} from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-white flex justify-between items-center p-5 ">
      <Link className="px-3 text-black" href="/">
        <h1 className="text-2xl font-bold">{`Instagram`}</h1>
      </Link>
      <nav className=" flex gap-4">
        <Link className="text-black" href="/">
          <AiFillHome className="w-7 h-7" />
        </Link>
        <Link className="text-black" href="/search">
          <AiOutlineSearch className="w-7 h-7" />
        </Link>
        <Link className="text-black" href="/write">
          <AiOutlinePlusSquare className="w-7 h-7" />
        </Link>
        {session ? (
          <Link className="text-black" href="/user">
            <Image
              className="rounded-full"
              priority={true}
              src={session.user?.image || ""}
              alt="profile"
              width={30}
              height={30}
            />
          </Link>
        ) : null}
        <LogoutButton />
      </nav>
    </header>
  );
}
