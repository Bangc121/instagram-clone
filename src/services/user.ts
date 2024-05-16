import { client } from "../../sanity/lib/client";
import { get } from "http";

export async function getUserByEmail(email: string) {
  const user = await client.fetch(`*[_type == "user" && email == "${email}"]`);

  return user;
}

export async function getUserByName(name: string) {
  const user = await client.fetch(
    `*[_type == "user" && fullName == "${name}"]`
  );

  return user;
}

export async function getAllUsers() {
  const users = await client.fetch(`*[_type == "user"]`);
  return users;
}

export async function getSearchUser(search: string) {
  const userByEmail = await getUserByEmail(search);
  const userByName = await getUserByName(search);

  if (userByEmail.length > 0) {
    return userByEmail;
  }
  if (userByName.length > 0) {
    return userByName;
  }
  return [];
}
