import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <header className="bg-white flex justify-between items-center p-5 ">
      <Link className="px-3 text-black" href="/">
        <h1 className="text-2xl font-bold">{`Instagram`}</h1>
      </Link>
      <nav className=" flex gap-4">
        <Link className="text-black" href="/">
          Home
        </Link>
        <Link className="text-black" href="/search">
          Search
        </Link>
        <Link className="text-black" href="/write">
          Write
        </Link>
        <Link className="text-black" href="/user">
          User
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
}
