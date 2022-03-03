import Image from "next/image";

export default function Members() {
  const arr = [1, 2, 3, 4, 1, 2, 2];
  return (
    <div className="p-5 grid grid-cols-6">
      {arr.map((_) => (
        <div className="flex flex-col items-center mb-10 cursor-pointer">
          {/* image */}
          <div>
            <Image
              src="https://lh3.googleusercontent.com/a/AATXAJysgatRjvTIulIPGT4P3121vSttWG31a_TDAPk4=s96-c"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          {/* name */}
          <p className="text-2xl font-bold mt-2">Kami No</p>
        </div>
      ))}
      {/* add a member */}
      <div className="flex flex-col items-center mb-10 cursor-pointer">
        {/* image */}
        <div className="grid place-items-center w-[100px] h-[100px] mb-[7px] bg-slate-400 rounded-full">
          <p className="text-white text-5xl font-bold">+</p>
        </div>
        {/* name */}
        <p className="text-2xl font-bold mt-2">Invite</p>
      </div>
    </div>
  );
}

// email: "kaminoko101@gmail.com"
// id: "6218db95a07c4bb580632582"
// image: "https://lh3.googleusercontent.com/a/AATXAJysgatRjvTIulIPGT4P3121vSttWG31a_TDAPk4=s96-c"
// name: "Kami No"
