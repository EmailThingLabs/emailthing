import React from "react";

export default function ServiceContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
