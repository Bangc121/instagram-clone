import { defineArrayMember, defineField } from "sanity";

import { BiUser } from "react-icons/bi";

const user = {
  name: "user",
  title: "User",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "profileImageUrl",
      title: "Profile Image Url",
      type: "string",
    }),
    {
      title: "Followings",
      name: "followings",
      type: "array",
      of: [{ type: "user" }],
    },
    {
      type: "array",
      name: "likes",
      title: "Likes",
      of: [
        defineArrayMember({
          type: "object",
          name: "tag",
          fields: [{ type: "string", name: "id" }],
        }),
      ],
    },
    {
      type: "array",
      name: "bookmarks",
      title: "Bookmarks",
      of: [
        defineArrayMember({
          type: "object",
          name: "tag",
          fields: [{ type: "string", name: "id" }],
        }),
      ],
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      description: "Upload a profile picture",
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

export default user;
