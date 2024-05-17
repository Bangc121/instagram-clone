import { client } from "../../sanity/lib/client";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = (query: string) => client.fetch(query);

export function useUserById(id?: string) {
  const { data, error, isLoading } = useSWR(
    `*[_type == "user" && _id == "${id}"][0]`,
    fetcher
  );
  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useUser() {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWR(
    `*[_type == "user" && email == "${session?.user?.email}"][0]`,
    fetcher
  );
  return {
    user: data,
    isLoading,
    isError: error,
  };
}
