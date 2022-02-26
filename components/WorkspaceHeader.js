import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { signOut } from "next-auth/react";

export default function WorkspaceHeader({ user, toggleSideMenu }) {
  return (
    <div className="grid grid-cols-3 items-center px-5 py-2 border-solid border-[#EEEEEE] border-b-2 shadow-sm">
      <CgMenuGridR
        className="text-3xl cursor-pointer justify-self-start"
        onClick={toggleSideMenu}
      />

      <Link href="/dashboard">
        <a className="justify-self-center">
          <p className="font-righteous text-2xl">
            <span className="text-yellow-500">Work</span>
            <span className="text-pink-500">Now</span>
          </p>
        </a>
      </Link>

      <div className="flex justify-self-end">
        <Image
          src={user.image}
          width="35"
          height="35"
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
}
