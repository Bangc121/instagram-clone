import { SanityImageAssetDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";

export type PostUploadProps = {
  writer: string;
  content: string;
  image: File;
};

export async function getPosts(email: string) {
  const posts = await client.fetch(
    `*[_type == "post" && writer == "${email}"]`
  );
  return posts;
}

export async function uploadImage({
  writer,
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
          writer,
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
