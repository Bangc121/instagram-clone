import { client } from "../../../../../sanity/lib/client";

export async function POST(req: Request) {
  const body = await req.json();
  const query = `*[_type == "user" && email == "${body.email}"] {
        email, 
      }[0]`;

  const data = await client.fetch(query);

  if (data && data.email === body.email) {
    return new Response(
      JSON.stringify({ message: "User Exists", value: true }),
      {
        status: 200,
      }
    );
  } else {
    return new Response(
      JSON.stringify({ message: "User NonExists", value: false }),
      {
        status: 200,
      }
    );
  }
}
