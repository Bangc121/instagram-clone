"use client";

import { ReactElement, ReactNode, useState } from "react";

import Tab from "./Tab";

type UserTabProps = {
  children: ReactElement[];
};
export default function UserTab({ children }: UserTabProps) {
  const [activeTab, setActiveTab] = useState<string>(children[0].props.label);

  const handleTabClick = (tabLabel: string) => {
    setActiveTab(tabLabel);
  };

  return (
    <div className="">
      <section className="flex flex-row justify-around items-center h-12 w-70">
        {children &&
          children.map((child: ReactElement) => (
            <Tab
              key={child.props.label}
              label={child.props.label}
              onClick={handleTabClick}
              activeTab={activeTab}
            />
          ))}
      </section>
      <div>
        {children.map((child: ReactElement) =>
          child.props.label === activeTab ? child.props.children : null
        )}
      </div>
    </div>
  );
}
