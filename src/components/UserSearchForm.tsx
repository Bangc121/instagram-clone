"use client";

import { getAllUsers, getSearchUser } from "@/services/user";
import { useCallback, useEffect, useState } from "react";

import { User } from "@/app/page";
import UserList from "./UserList"; // Add this line

export default function UserSearchForm() {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await getSearchUser(search);
    setUsers(user);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (event.target.value === "") fetchUsers();
  };

  const fetchUsers = useCallback(async () => {
    const response = await getAllUsers();
    setUsers(response);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <form className="container px-4 max-w-xl mx-auto" onSubmit={onSubmit}>
      <input
        type="search"
        id="from"
        name="from"
        placeholder="Search for a user..."
        required
        autoFocus
        value={search}
        onChange={onChange}
        className="text-black w-full border-2 border-gray-200 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:border-blue-500"
      />
      <UserList users={users} />
    </form>
  );
}
