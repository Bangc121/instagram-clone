import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { IoIosBookmark, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Post, User } from "@/app/page";
import {
  getLikedPosts,
  updateMyBookmark,
  updateMyLike,
} from "@/services/posts";

import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PostCard({ post }: { post: Post }) {
  const { data: session } = useSession();
  const { image, content, likes, isBookmarked } = post;
  const [bookmark, setBookmark] = useState(isBookmarked);
  const [like, setLike] = useState(false);

  const onClickBookmark = () => {
    console.log("Bookmark clicked");
    if (session?.user?.email) {
      setBookmark(!bookmark);
      updateMyBookmark(session?.user?.email, post._id);
    }
  };

  const onClickLike = () => {
    console.log("Like clicked");
    if (session?.user?.email) {
      setLike(!like);
      updateMyLike(session?.user?.email, post._id);
    }
  };
  return (
    <article className="rounded-md overflow-hidden shadow-l hover:shadow-xl">
      {/* <div className="flex flex-row p-2">
        <Image
          src={user.image}
          alt={user.name}
          width={25}
          height={25}
          className="rounded-full mr-2"
        />
        <h1>{user.name}</h1>
      </div> */}
      <div className="bg-slate-100 p-10 h-96 dark:bg-slate-800">
        <Image
          priority={true}
          src={`https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${image.asset._ref.split("-")[1] + "-" + image.asset._ref.split("-")[2] + "." + image.asset._ref.split("-")[3]}`}
          alt={image.alt}
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row w-full justify-between p-2 text-black">
          <div className="flex flex-row items-center">
            {like ? (
              <IoMdHeart className="w-7 h-7" fill="red" onClick={onClickLike} />
            ) : (
              <IoMdHeartEmpty className="w-7 h-7" onClick={onClickLike} />
            )}
            <p className="pl-3">{likes && likes.length}</p>
          </div>
          {bookmark ? (
            <IoBookmark className="w-7 h-7" onClick={onClickBookmark} />
          ) : (
            <IoBookmarkOutline className="w-7 h-7" onClick={onClickBookmark} />
          )}
        </div>
      </div>
      <span className="p-2 pb-5">{content}</span>
    </article>
  );
}
