import { User } from "@/app/page";
import { client } from "../../sanity/lib/client";
import { get } from "http";

export async function getUserByEmail(email: string) {
  const user = await client.fetch(
    `*[_type == "user" && email == "${email}"][0]`
  );
  return user;
}

export async function getUserByName(name: string) {
  const user = await client.fetch(
    `*[_type == "user" && fullName == "${name}"][0]`
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

  if (userByEmail) {
    return [userByEmail];
  }
  if (userByName) {
    return [userByName];
  }
  return [];
}

export async function updateFollowUser(user: User, targetUser: User) {
  return await client
    .patch(user._id)
    .setIfMissing({ followings: [] })
    .append("followings", [targetUser])
    .commit({ autoGenerateArrayKeys: true })
    .then(async (updated) => {
      return await client
        .patch(targetUser._id)
        .setIfMissing({ followers: [] })
        .append("followers", [user])
        .commit({ autoGenerateArrayKeys: true })
        .then((targetUserUpdated) => {
          return updated;
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => {
      return err;
    });
}

export async function updateUnFollowUser(user: User, targetUser: User) {
  const followingsToRemove = [`followings[_key=="${targetUser._key}"]`];
  return await client
    .patch(user._id)
    .unset(followingsToRemove)
    .commit()
    .then(async (updated) => {
      const followersToRemove = [`followers[_id=="${user._id}"]`];
      return await client
        .patch(targetUser._id)
        .unset(followersToRemove)
        .commit()
        .then((followersUpdated) => {
          return updated;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    })
    .catch((err) => {
      return err;
    });
}

export async function getFollowings(user: User) {
  const followings = await client.fetch(
    `*[_type == "user" && _id == "${user._id}"][0]{followings[]}`
  );
  return followings;
}

export async function getFollowers(user: User) {
  const followers = await client.fetch(
    `*[_type == "user" && _id == "${user._id}"][0]{followers[]}`
  );
  return followers;
}
