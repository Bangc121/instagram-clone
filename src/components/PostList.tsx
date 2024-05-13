import { useEffect, useState } from "react";

import { Post } from "@/app/page";
import PostCard from "./PostCard";
import { getPosts } from "../../sanity/lib/client";
import { useSession } from "next-auth/react";

export default function PostList() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await getPosts();
    setPosts(response);
  };

  return (
    <ul className="grid grid-flow-row">
      {session &&
        posts.map((post) => (
          <li key={post.content}>
            <PostCard post={post} user={session.user} />
          </li>
        ))}
    </ul>
  );
}
