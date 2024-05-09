import { BiUser } from "react-icons/bi";
import { defineField } from "sanity";

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