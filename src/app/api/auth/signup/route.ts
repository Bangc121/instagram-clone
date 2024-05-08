import * as yup from "yup";

import { client } from "../../../../../sanity/lib/client";

const bodySchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  profileImageUrl: yup.string().required(),
});

export async function POST(req: Request) {
  const body = await req.json();

  if (!bodySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: "유효하지 않은 포맷" }), {
      status: 400,
    });
  }

  return await client
    .create({
      _type: "user",
      fullName: body.username,
      email: body.email,
      profileImageUrl: body.profileImageUrl,
      createdAt: new Date().toISOString(),
    })
    .then((res) => {
      console.log(`user was created, document ID is ${res._id}`);
      return new Response(
        JSON.stringify({
          message: "user was created",
        }),
        {
          status: 200,
        }
      );
    })
    .catch((err) => {
      console.error(err);
      return new Response(JSON.stringify({ message: "Error" }), {
        status: 500,
      });
    });
}
