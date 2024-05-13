import { MoonLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <MoonLoader color="#36d7b7" />;
    </div>
  );
}
