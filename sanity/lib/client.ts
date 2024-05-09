import { apiVersion, dataset, projectId, token, useCdn } from "../env";

import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
});

export async function getPosts() {
  const posts = await client.fetch('*[_type == "post"]');
  return posts;
}
