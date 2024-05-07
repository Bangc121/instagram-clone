"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import LoginButton from "@/components/LoginButton";

const provider = [
  {
    name: "google",
  },
];

export default function Login() {
  const { data: session } = useSession(); //세션 정보를 가져옴
  return (
    <section className="flex flex-col">
      {session
        ? null
        : provider.map((data) => (
            <LoginButton
              key={data.name}
              text={data.name}
              provider={data.name}
            />
          ))}
    </section>
  );
}
