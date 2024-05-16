import FileUpload from "@/components/FileUpload";
import { Suspense } from "react";
import UserList from "@/components/UserList";
import UserSearchForm from "@/components/UserSearchForm";

export default function SearchPage() {
  return (
    <section className="flex flex-col justify-center items-center my-10">
      <UserSearchForm />
    </section>
  );
}
