import { client } from "../../sanity/lib/client";

export async function getUserInfo(email: string) {
  const user = await client.fetch(
    `*[_type == "user" && email == "${email}"][0]`
  );
  return user;
}
