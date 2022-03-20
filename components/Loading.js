import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-screen justify-center items-center">
      <ClipLoader />
    </div>
  );
}
