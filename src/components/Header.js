import React from "react";

export default function Header() {
  return (
    <div className="mt-12">
      <div className="flex justify-center items-center">
        <h1 className="text-6xl">Flask/React ToDo App</h1>
      </div>
      <div className="mt-10 flex justify-center items-center">
        <h3 className="text-3xl">Items To Do</h3>
      </div>
    </div>
  );
}
