import Avatar from "./Avatar";
import { User } from "@/app/page";

export default function AvatarCard({ user }: { user: User }) {
  return (
    <article className="rounded-md overflow-hidden shadow-l hover:shadow-xl w-full p-3">
      <Avatar user={user} width={20} height={20} />
    </article>
  );
}
