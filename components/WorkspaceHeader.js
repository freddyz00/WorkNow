import Image from "next/image";
import { useRef, useEffect } from "react";
import { CgMenuGridR } from "react-icons/cg";

export default function WorkspaceHeader({ user }) {
  return (
    <div className="grid grid-cols-3 items-center px-5 py-2 border-solid border-[#EEEEEE] border-b-2 shadow-sm">
      <CgMenuGridR className="text-3xl cursor-pointer justify-self-start" />

      <p className="font-righteous text-2xl justify-self-center">
        <span className="text-yellow-500">Work</span>
        <span className="text-pink-500">Now</span>
      </p>

      <div className="flex justify-self-end">
        <Image
          src={user.image}
          width="35"
          height="35"
          className="rounded-full cursor-pointer"
        />
      </div>
    </div>
    // <div className="flex justify-between items-center px-5 py-2 border-solid border-[#EEEEEE] border-b-2 shadow-sm">
    //   <CgMenuGridR className="text-3xl cursor-pointer" />

    //   <h1 className="font-righteous text-2xl">
    //     <span className="text-yellow-500">Work</span>
    //     <span className="text-pink-500">Now</span>
    //   </h1>

    //   <Image
    //     src={user.image}
    //     width="35"
    //     height="35"
    //     className="rounded-full cursor-pointer"
    //   />
    // </div>
  );
}
