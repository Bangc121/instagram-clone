"use client";

import { useEffect, useState } from "react";

import FollowButton from "../Button/FollowButton";
import Image from "next/image";
import { User } from "@/app/page";
import { useUser } from "@/hook/useUser";

type Props = {
  user: User;
};

export default function Profile({ user: targetUser }: Props) {
  const { user } = useUser();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (user && targetUser) {
      setIsOwner(user._id === targetUser._id);
    }
  }, [user, targetUser]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className={`relative h-24 w-24`}>
        <Image
          src={targetUser.profileImageUrl || "/avatar.png"}
          alt={""}
          fill
          priority
          className="rounded-full"
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col ml-5">
        <p className="text-md font-medium">{targetUser.fullName}</p>
        <p className="text-md font-light ">{targetUser.email}</p>
        <p className="text-md font-light ">
          {`post 3`}{" "}
          {`following ${isOwner ? (user?.followings ? user.followings.length : 0) : targetUser?.followings ? targetUser.followings.length : 0}`}{" "}
          {`followers ${isOwner ? (user?.followers ? user.followers.length : 0) : targetUser?.followers ? targetUser.followers.length : 0}`}
        </p>
      </div>
      {!isOwner && (
        <div className="flex flex-col gap-2 ml-12">
          <FollowButton user={user} targetUser={targetUser} />
          <button className="bg-gray-500 hover:bg-gray-700 w-36 text-white font-bold py-2 px-4 rounded">
            Message
          </button>
        </div>
      )}
    </div>
  );
}
