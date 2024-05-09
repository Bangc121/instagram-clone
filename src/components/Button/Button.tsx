type Props = {
  children?: React.ReactNode;
  color?: string;
  fullWidth?: boolean;
  variant: "primary" | "secondary";
  rounded?: "sm" | "md" | "lg";
};
export default function Button({ children, color, fullWidth, rounded }: Props) {
  return (
    <button
      className={`flex flex-row justify-center items-center h-16 ${color} ${fullWidth ? "w-full" : null} ${rounded ? `rounded-${rounded}` : null}`}
      onClick={() => {}}
    >
      {children}
    </button>
  );
}
