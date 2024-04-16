import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col px-2">{children}</div>;
}
