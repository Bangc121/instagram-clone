"use client";

import { Suspense, useEffect, useState } from "react";

import Avatar from "@/components/Avatar";
import Loading from "./loading";
import Login from "@/components/Login";
import PostList from "@/components/PostList";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import useUser from "@/hook/useUser";

export type Post = {
  _id: string;
  content: string;
  likes: string[];
  author: string;
  isLiked: boolean;
  isBookmarked: boolean;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
    _type: string;
  };
};

export type User = {
  _id: string;
  email: string;
  fullName: string | null | undefined;
  profileImageUrl: string | null | undefined;
};

export default function Home() {
  const { status } = useSession();
  const { user, isLoading } = useUser();

  return (
    <section className="flex flex-row justify-center">
      {status === "authenticated" && user ? (
        <>
          <PostList />
          <section className="flex flex-col justify-start items-start pt-6 px-8">
            <Avatar user={user} width={50} height={50} />
            <span className="mt-10">Copyright INSTAGRAM-CLONE from METAL</span>
          </section>
        </>
      ) : (
        <Login />
      )}
    </section>
  );
}
