import { signIn, signOut, useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

type Props = {
  text: string;
  provider: string;
  setLoading: (loading: boolean) => void;
};
export default function LoginButton({ text, provider, setLoading }: Props) {
  return (
    <button
      className="flex flex-row bg-yellow-200 rounded-md justify-center items-center p-3 w-1/3 m-auto mt-4 gap-5"
      onClick={() => {
        signIn(provider);
        setLoading(true);
      }}
    >
      <FcGoogle className="w-9 h-9" />
      {text}
    </button>
  );
}
