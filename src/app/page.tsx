import { Suspense, useEffect, useState } from "react";

import Loading from "./loading";
import Login from "@/components/Login";

export type Post = {
  content: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
    _type: string;
  };
};

export type User = {
  email: string;
  name: string;
  image: string;
};

export default function Home() {
  return (
    <Suspense fallback={<h1>Loading Login</h1>}>
      <Login />
    </Suspense>
  );
}
