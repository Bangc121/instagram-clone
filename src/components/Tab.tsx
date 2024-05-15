import React from "react";

export default function Tab({ label, activeTab, onClick }) {
  const handleClick = () => {
    onClick(label);
  };

  return (
    <div
      className={`tab ${activeTab === label ? "active" : ""}`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
}
