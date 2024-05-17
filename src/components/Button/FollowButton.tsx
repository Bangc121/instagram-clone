"use client";

import { updateFollowUser, updateUnFollowUser } from "@/services/user";
import { useEffect, useState } from "react";

import { MoonLoader } from "react-spinners";
import { User } from "@/app/page";

type Props = {
  user: User;
  targetUser: User;
  isFollowing?: boolean;
};

export default function FollowButton({ user, targetUser, isFollowing }: Props) {
  const [following, setFollowing] = useState<User>();
  const [isLoading, setIsLoading] = useState(isFollowing);

  const onClickFollow = async () => {
    setIsLoading(true);
    if (following) {
      const res = await updateUnFollowUser(user, following);
      handleFollow(res, targetUser);
    } else {
      const res = await updateFollowUser(user, targetUser);
      handleFollow(res, targetUser);
    }
    setIsLoading(false);
  };

  function handleFollow(user: User, targetUser: User) {
    const isFollowing = user.followings?.find(
      (user: User) => user._id === targetUser._id
    );
    if (isFollowing) {
      setFollowing(isFollowing);
    } else {
      setFollowing(undefined);
    }
  }

  useEffect(() => {
    if (user && targetUser) {
      handleFollow(user, targetUser);
    }
  }, [user, targetUser]);

  return (
    <button
      className={`${following ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"} w-36 h-10 text-white font-bold py-2 px-4 rounded justify-center items-center flex`}
      onClick={onClickFollow}
    >
      {isLoading ? (
        <MoonLoader color="#fff" size={15} />
      ) : following ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </button>
  );
}
