import Image from "next/image";
import LikedPosts from "@/components/User/Liked";
import SavedPosts from "@/components/User/Saved";
import UserPosts from "@/components/User/Posts";
import UserTab from "@/components/UserTab";

export default function UserPage() {
  return (
    <section className="container px-4 max-w-5xl mx-auto">
      <UserTab>
        <div label="POSTS">
          <UserPosts />
        </div>
        <div label="SAVED">
          <SavedPosts />
        </div>
        <div label="LIKED">
          <LikedPosts />
        </div>
      </UserTab>
    </section>
  );
}
