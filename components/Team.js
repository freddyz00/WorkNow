import Image from "next/image";
import { useState } from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/router";

export default function Team() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const arr = [1, 2, 3, 4, 1, 2, 2];

  const handleCloseModal = () => {
    setIsInviteModalOpen(false);
    setEmailInput("");
  };

  const inviteNewMember = async (e) => {
    e.preventDefault();
    if (emailInput) {
      // invite member
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/member`, {
        workspaceId,
        email: emailInput,
      });

      handleCloseModal();
    }
  };

  return (
    <div className="p-5 grid grid-cols-6">
      {/* add a member */}
      <div
        className="flex flex-col items-center mb-10 cursor-pointer"
        onClick={() => setIsInviteModalOpen(true)}
      >
        {/* image */}
        <div className="grid place-items-center w-[100px] h-[100px] mb-[7px] bg-slate-400 rounded-full">
          <p className="text-white text-5xl font-bold">+</p>
        </div>
        {/* name */}
        <p className="text-2xl font-bold mt-2">Invite</p>
      </div>
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
      <ReactModal
        isOpen={isInviteModalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            borderRadius: "10px",
            top: "20%",
            left: "30%",
            right: "30%",
            bottom: "20%",
          },
        }}
      >
        <div className="flex flex-col h-full justify-between p-3">
          {/* header */}
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">Invite new member</p>
            <div
              onClick={handleCloseModal}
              className="p-1 hover:bg-slate-200 cursor-pointer rounded-md"
            >
              <IoMdClose className="text-2xl" />
            </div>
          </div>

          {/* form input */}
          <form className="flex flex-col" onSubmit={inviteNewMember}>
            <label htmlFor="emailInput">Email</label>
            <input
              id="emailInput"
              type="email"
              autoFocus
              autoComplete="off"
              placeholder="Email Address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="py-2 px-3 mt-2 rounded-md border-solid border-2 border-slate-300"
            />
          </form>

          {/* footer */}
          <div className="flex justify-end">
            <Button title="Invite" type="primary" onPress={inviteNewMember} />
          </div>
        </div>
      </ReactModal>
    </div>
  );
}
