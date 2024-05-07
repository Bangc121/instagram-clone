import { BiUser } from "react-icons/bi";
import { defineField } from "sanity";

const post = {
  name: "post",
  title: "Post",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "string",
      description: "In one short sentence, what do you do?",
      validation: (Rule) => Rule.required(),
    }),
    {
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      description: "Upload a thumbnail picture",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
  ],
};

export default post;
