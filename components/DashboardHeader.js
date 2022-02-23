import Image from "next/image";
import { useRef, useEffect } from "react";

export default function DashboardHeader({ user }) {
  return (
    <div className="flex justify-between items-center px-3 py-2 bg-slate-100">
      <p>Board</p>

      <Image src={user.image} width="35" height="35" className="rounded-full" />
    </div>
  );
}
