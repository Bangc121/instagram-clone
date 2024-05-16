"use client";

import { Suspense, useCallback, useEffect, useState } from "react";

import AvatarCard from "./AvatarCard";
import { User } from "@/app/page";

export default function UserList({ users }: { users: User[] }) {
  return (
    <Suspense fallback={<h1>Loading movie videos</h1>}>
      <section className="container px-4 max-w-xl mx-auto">
        <ul className="grid gap-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
          {users &&
            users.map((user: User) => (
              <li key={user._id}>
                <AvatarCard user={user} />
              </li>
            ))}
        </ul>
      </section>
    </Suspense>
  );
}
