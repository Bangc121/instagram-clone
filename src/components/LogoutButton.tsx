"use client";

import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const { data: session } = useSession();
  return (
    <>{session ? <button onClick={() => signOut()}>sign out</button> : null}</>
  );
}
