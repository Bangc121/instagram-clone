import { Post } from "@/app/page";
import PostCard from "./PostCard";

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <li key={post.content}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
