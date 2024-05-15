"use client";

import { Suspense, useEffect, useState } from "react";

import Loading from "./loading";
import Login from "@/components/Login";
import PostList from "@/components/PostList";
import { useSession } from "next-auth/react";

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
  email: string;
  name: string;
  image: string;
};

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("status:", status);
  }, [status]);
  return <>{status === "authenticated" ? <PostList /> : <Login />}</>;
}
