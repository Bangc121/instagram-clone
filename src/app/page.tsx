"use client";

import { client, getPosts } from "../../sanity/lib/client";
import { useEffect, useState } from "react";

import Image from "next/image";
import Login from "@/components/Login";
import PostCard from "@/components/PostCard";

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

export default function Home() {
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
      <ul className="grid ">
        {posts &&
          posts.map((post) => (
            <li key={post.content}>
              <PostCard post={post} />
            </li>
          ))}
      </ul>
      <Login />
    </>
  );
}
