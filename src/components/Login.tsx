"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Loading from "@/app/loading";
import LoginButton from "@/components/LoginButton";

const provider = [
  {
    name: "google",
  },
];

export default function Login() {
  const { data: session, status } = useSession(); //세션 정보를 가져옴
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
    }
  }, [status]);

  if (status === "loading" || loading === true) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col h-full justify-center items-center">
      {provider.map((data) => (
        <LoginButton
          key={data.name}
          text={data.name}
          provider={data.name}
          setLoading={setLoading}
        />
      ))}
    </section>
  );
}
