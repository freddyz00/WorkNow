import Image from "next/image";

export default function DashboardHeader({ user }) {
  return (
    <div className="grid grid-cols-3 items-center px-5 py-2 border-solid border-[#EEEEEE] border-b-2 shadow-sm">
      <p className="font-righteous text-2xl justify-self-start">
        <span className="text-yellow-500">Work</span>
        <span className="text-pink-500">Now</span>
      </p>

      <p className="justify-self-center text-xl font-medium">Workspaces</p>

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
