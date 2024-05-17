import { Suspense, useCallback, useEffect, useState } from "react";

import { Post } from "@/app/page";
import PostCard from "./PostCard";
import { getAllPosts } from "@/services/posts";
import { useUser } from "@/hook/useUser";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, isLoading } = useUser();

  const fetchPosts = useCallback(async () => {
    const response = await getAllPosts(user.email);
    setPosts(response);
  }, [user.email]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 max-w-lg">
        {posts.map((post) => (
          <li key={post._id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </Suspense>
  );
}
