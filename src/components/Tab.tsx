import React from "react";

type TabProps = {
  label: string;
  activeTab: string;
  onClick: (label: string) => void;
};
export default function Tab({ label, activeTab, onClick }: TabProps) {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <div
      className={`flex ${activeTab === label ? "font-bold border-t-2 border-indigo-500" : ""} w-full h-full justify-center items-center cursor-pointer`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
}
