import Login from "@/components/Login";
import { client } from "../../sanity/lib/client";

type post = {
  title: string;
  content: string;
  thumbnail: string;
};

async function getData() {
  const query = `*[_type == "post"] {
    title,
    content,
    thumbnail
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: post[] = await getData();

  console.log("data", data);
  return (
    <>
      <h1>ewfefef</h1>
      {data.map((post) => {
        return (
          <div key={post.title}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        );
      })}
      <Login />
    </>
  );
}
