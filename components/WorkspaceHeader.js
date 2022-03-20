import Image from "next/image";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

export default function WorkspaceHeader({ user }) {
  const selectedTab = useSelector((state) => state.selectedTab);

  return (
    <div className="grid grid-cols-2 items-center px-5 py-2 border-solid border-[#EEEEEE] border-b-2 shadow-sm">
      <p className="font-medium text-lg">{selectedTab}</p>

      <Popup
        trigger={
          <div className="flex justify-self-end">
            <Image
              src={user.image}
              width="30"
              height="30"
              className="rounded-full cursor-pointer"
            />
          </div>
        }
        position="bottom right"
      >
        <div className="bg-white p-3 rounded-md shadow border border-slate-200 border-solid">
          {/* account info */}
          <div className="flex items-start border-b border-solid border-gray-300 pb-2">
            <Image
              src={user.image}
              width="40"
              height="40"
              className="rounded-full cursor-pointer"
            />

            <div className="ml-3">
              <p className="font-medium">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>

          {/* logout */}
          <div
            className="flex items-center hover:bg-slate-200 cursor-pointer mt-2 rounded px-3 py-2"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <BiLogOut className="text-2xl mr-2" />
            <p>Logout</p>
          </div>
        </div>
      </Popup>
    </div>
  );
}
