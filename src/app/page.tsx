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
  return (
    <>
      <h1>ewfefef</h1>
      <Login />
    </>
  );
}
