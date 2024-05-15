import { useCallback, useEffect, useState } from "react";

import { Post } from "@/app/page";
import PostCard from "./PostCard";
import { getAllPosts } from "@/services/posts";
import { useSession } from "next-auth/react";

export default function PostList() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    if (session?.user?.email) {
      const response = await getAllPosts(session?.user?.email);
      setPosts(response);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ul className="grid grid-flow-row">
      {posts.map((post) => (
        <li key={post._id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
