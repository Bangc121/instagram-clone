"use client";

import { getPosts } from "../../sanity/lib/client";
import { useEffect, useState } from "react";

import Image from "next/image";
import Login from "@/components/Login";
import PostCard from "@/components/PostCard";
import { useSession } from "next-auth/react";

export type Post = {
  content: string;
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
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await getPosts();
    console.log(response);
    setPosts(response);
  };

  return (
    <>
      <ul className="grid grid-flow-row">
        {session &&
          posts &&
          posts.map((post) => (
            <li key={post.content}>
              <PostCard post={post} user={session.user} />
            </li>
          ))}
      </ul>
      <Login />
    </>
  );
}
