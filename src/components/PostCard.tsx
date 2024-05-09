import Image from "next/image";
import { Post, User } from "@/app/page";
import { client } from "../../sanity/lib/client";

export default function PostCard({ post, user }: { post: Post; user: User }) {
  const { image, content } = post;
  return (
    <article className="overflow-hidden rounded-sm shadow-l max-w-md mx-auto">
      <div className="flex flex-row p-2">
        <Image
          src={user.image}
          alt={user.name}
          width={25}
          height={25}
          className="rounded-full mr-2"
        />
        <h1>{user.name}</h1>
      </div>
      <Image
        src={`https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${image.asset._ref.split("-")[1] + "-" + image.asset._ref.split("-")[2] + "." + image.asset._ref.split("-")[3]}`}
        alt={image.alt}
        width={500}
        height={500}
      />
      <span className="p-2 pb-5">{content}</span>
    </article>
  );
}
