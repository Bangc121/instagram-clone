import { BiUser } from "react-icons/bi";
import { defineField } from "sanity";

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
      name: "writer",
      title: "Writer",
      type: "string",
      description: "owner of the post",
      validation: (Rule) => Rule.required(),
    }),
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
