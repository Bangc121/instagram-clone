import Image from "next/image";
import { User } from "@/app/page";

type Props = {
  user: User;
  width: number;
  height: number;
};

export default function Avatar({ user, width, height }: Props) {
  return (
    <div className="flex items-center">
      <div className={`relative h-20 w-20`}>
        <Image
          src={user.profileImageUrl || "/avatar.png"}
          alt={""}
          fill
          priority
          className="rounded-full"
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium">{user.fullName}</p>
        <p className="text-sm font-light text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
