import { ReactElement } from "react";

export default function TabLabel({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) {
  return <>{children}</>;
}
