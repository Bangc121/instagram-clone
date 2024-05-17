"use client";

import { Suspense, useEffect, useState } from "react";

import Avatar from "@/components/Avatar";
import Loading from "./loading";
import Login from "@/components/Login";
import PostList from "@/components/PostList";
import { useSession } from "next-auth/react";
import { useUser } from "@/hook/useUser";

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
  _key?: string;
  _id: string;
  email: string | null | undefined;
  fullName: string | null | undefined;
  profileImageUrl: string | null | undefined;
  followings?: User[];
  followers?: User[];
  likes?: string[];
  bookmarks?: string[];
};

export default function Home() {
  const { data: session, status } = useSession();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="flex flex-row justify-center">
      {status === "authenticated" ? (
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
