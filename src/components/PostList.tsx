import { useCallback, useEffect, useState } from "react";

import { Post } from "@/app/page";
import PostCard from "./PostCard";
import { getPosts } from "@/services/posts";
import { useSession } from "next-auth/react";

export default function PostList() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    if (session?.user?.email) {
      const response = await getPosts(session?.user?.email);
      setPosts(response);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <ul className="grid grid-flow-row">
      {posts.map((post) => (
        <li key={post.content}>
          <PostCard post={post} user={session.user} />
        </li>
      ))}
    </ul>
  );
}
