import React from "react";

export default function Content({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1600px] py-4">{children}</div>;
}
