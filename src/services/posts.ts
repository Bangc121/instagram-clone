import { Post } from "@/app/page";
import { SanityImageAssetDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { getUserInfo } from "./user";

export type PostUploadProps = {
  author: string;
  content: string;
  image: File;
};

export async function getAllPosts(email: string) {
  const posts = await client.fetch(`*[_type == "post"]`);
  const user = await getUserInfo(email);

  let filteredPosts = posts.map((post: Post) => {
    let tempPost;
    const like =
      user.likes &&
      user.likes.find((like: { id: string }) => like.id === user._id);
    const bookmark =
      user.bookmarks &&
      user.bookmarks.find(
        (bookmark: { id: string }) => bookmark.id === post._id
      );

    if (bookmark) {
      tempPost = { ...post, isBookmarked: true };
    } else {
      tempPost = { ...post, isBookmarked: false };
    }

    if (like) {
      return { ...tempPost, isLiked: true };
    } else {
      return { ...tempPost, isLiked: false };
    }
  });

  return filteredPosts;
}

export async function getMyPosts(email: string) {
  const posts = await client.fetch(
    `*[_type == "post" && author == "${email}"]`
  );
  return posts;
}

export async function getSavedPosts(email: string) {
  const posts = await client.fetch(
    `*[_type == "post" && author != "${email}"]`
  );
  return posts;
}

export async function getLikedPosts(email: string) {
  const posts = await client.fetch(
    `*[_type == "post" && author != "${email}"]`
  );
  return posts;
}

export async function updateMyLike(email: string, postId: string) {
  const user = await getUserInfo(email);
  const like =
    user.likes && user.likes.find((like: { id: string }) => like.id === postId);

  if (like) {
    const likesToRemove = [`likes[_key=="${like._key}"]`];
    client
      .patch(user._id)
      .unset(likesToRemove)
      .commit()
      .then((updatedlike) => {
        console.log("Hurray, the like is updated! New document:");
        console.log(updatedlike);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  } else {
    client
      .patch(user._id)
      .setIfMissing({ like: [] })
      .append("like", [{ id: postId }])
      .commit({ autoGenerateArrayKeys: true })
      .then((updatedlike) => {
        console.log("Hurray, the like is updated! New document:");
        console.log(updatedlike);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  }
  return;
}

export async function updateMyBookmark(email: string, postId: string) {
  const user = await getUserInfo(email);
  const bookmark = user.bookmarks.find(
    (bookmark: { id: string }) => bookmark.id === postId
  );

  if (bookmark) {
    const bookmarksToRemove = [`bookmarks[_key=="${bookmark._key}"]`];
    client
      .patch(user._id)
      .unset(bookmarksToRemove)
      .commit()
      .then((updatedBookmark) => {
        console.log("Hurray, the bookmark is updated! New document:");
        console.log(updatedBookmark);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  } else {
    client
      .patch(user._id)
      .setIfMissing({ bookmarks: [] })
      .append("bookmarks", [{ id: postId }])
      .commit({ autoGenerateArrayKeys: true })
      .then((updatedBookmark) => {
        console.log("Hurray, the bookmark is updated! New document:");
        console.log(updatedBookmark);
      })
      .catch((err) => {
        console.error("Oh no, the update failed: ", err.message);
      });
  }

  return;
}

export async function uploadImage({
  author,
  content,
  image,
}: PostUploadProps): Promise<{ state: boolean }> {
  return client.assets
    .upload("image", image, {
      contentType: image.type,
      filename: image.name,
    })
    .then((imageAsset: SanityImageAssetDocument) => {
      client
        .create({
          _type: "post",
          content,
          author,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
            alt: image.name,
          },
          createdAt: new Date().toISOString(),
        })
        .then((res) => {
          console.log(`post was created, document ID is ${res._id}`);
        });
      return { state: true };
    })
    .catch((error) => {
      console.log("Upload failed: ", error);
      return { state: false };
    });
}
