"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import LoginButton from "@/components/LoginButton";
import { useEffect } from "react";

const provider = [
  {
    name: "google",
  },
];

export default function Login() {
  const { data: session } = useSession(); //세션 정보를 가져옴

  return (
    <section className="flex flex-col">
      {session ? (
        <>
          <Image
            priority={false}
            src={
              "https://lh3.googleusercontent.com/a/ACg8ocJm4AZfzDqEMDPbTLHyBkcmAmo6f7nkGMa2i1aYR0QeT3BcsYhs=s96-c"
            }
            alt="profile"
            width={100}
            height={100}
          />
        </>
      ) : (
        provider.map((data) => (
          <LoginButton key={data.name} text={data.name} provider={data.name} />
        ))
      )}
    </section>
  );
}
