import Image from "next/image";
import { Post } from "@/app/page";
import { client } from "../../sanity/lib/client";

export default function PostCard({ post }: { post: Post }) {
  const { image, content } = post;
  return (
    <article className="overflow-hidden">
      <Image
        src={`https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${image.asset._ref.split("-")[1] + "-" + image.asset._ref.split("-")[2] + "." + image.asset._ref.split("-")[3]}`}
        alt={image.alt}
        width={500}
        height={500}
      />
      <h1>{content}</h1>
    </article>
  );
}
