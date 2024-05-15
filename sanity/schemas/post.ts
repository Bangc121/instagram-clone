import { defineArrayMember, defineField } from "sanity";

import { BiUser } from "react-icons/bi";

type like = {
  _key?: string;
  email: string;
};

const post = {
  name: "post",
  title: "Post",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "string",
      description: "In one short sentence, what do you do?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "owner of the post",
      validation: (Rule) => Rule.required(),
    }),
    {
      type: "array",
      name: "likes",
      title: "Likes",
      of: [
        defineArrayMember({
          type: "object",
          name: "tag",
          fields: [{ type: "string", name: "email" }],
        }),
      ],
    },
    {
      name: "image",
      title: "Post Image",
      type: "image",
      description: "Upload a post picture",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "createdAt",
      title: "Created at",
      type: "datetime",
    },
  ],
};

export default post;
