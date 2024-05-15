"use client";

import { useCallback, useEffect, useState } from "react";

import { Post } from "@/app/page";
import PostGrid from "../PostGrid";
import { getLikedPosts } from "@/services/posts";
import { useSession } from "next-auth/react";

export default function LikedPosts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    if (session?.user?.email) {
      const response = await getLikedPosts(session?.user?.email);
      setPosts(response);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <PostGrid posts={posts} />
    </>
  );
}
