"use client";

import LikedPosts from "@/components/User/Liked";
import Loading from "@/app/loading";
import Profile from "@/components/User/Profile";
import SavedPosts from "@/components/User/Saved";
import TabLabel from "@/components/TabLabel";
import UserPosts from "@/components/User/Posts";
import UserTab from "@/components/UserTab";
import { useUserById } from "@/hook/useUser";

type Props = {
  params: {
    slug: string;
  };
};

export default function UserDetailPage({ params }: Props) {
  const { user, isLoading } = useUserById(params.slug);

  if (isLoading) return <Loading />;
  return (
    <section className="container px-4 max-w-5xl mx-auto">
      {user && (
        <>
          <div className="flex w-full justify-center items-center py-7">
            <Profile user={user} />
          </div>
          <UserTab>
            <TabLabel label="POSTS">
              <UserPosts user={user} />
            </TabLabel>
            <TabLabel label="SAVED">
              <SavedPosts user={user} />
            </TabLabel>
            <TabLabel label="LIKED">
              <LikedPosts user={user} />
            </TabLabel>
          </UserTab>
        </>
      )}
    </section>
  );
}
