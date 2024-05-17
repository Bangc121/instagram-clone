"use client";

import { Post, User } from "@/app/page";
import { useCallback, useEffect, useState } from "react";

import PostGrid from "../PostGrid";
import { getMyPosts } from "@/services/posts";

export default function UserPosts({ user }: { user: User }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    const response = await getMyPosts(user.email);
    setPosts(response);
  }, [user.email]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <PostGrid posts={posts} />
    </>
  );
}
