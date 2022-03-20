import { signOut } from "next-auth/react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function WorkspaceHeader({ user }) {
  const selectedTab = useSelector((state) => state.selectedTab);

  return (
    <div className="grid grid-cols-2 items-center px-5 py-2 border-solid border-[#EEEEEE] border-b-2 shadow-sm">
      <p className="font-medium text-lg">{selectedTab}</p>

      <div className="flex justify-self-end">
        <Image
          src={user.image}
          width="30"
          height="30"
          className="rounded-full cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        />
      </div>
    </div>
  );
}
