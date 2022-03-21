import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#FFFFFF88]">
      <div className="flex h-screen justify-center items-center">
        <ClipLoader />
      </div>
    </div>
  );
}
