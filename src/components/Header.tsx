"use client";

import {
  AiFillHome,
  AiOutlinePlusSquare,
  AiOutlineSearch,
} from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useUser } from "@/hook/useUser";

export default function Header() {
  const { user, isLoading } = useUser();
  return (
    <header className="bg-white flex justify-between items-center p-5">
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
        {user ? (
          <Link className="text-black" href={`/user/${user._id}`}>
            <Image
              className="rounded-full"
              priority={true}
              src={user.profileImageUrl || ""}
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
