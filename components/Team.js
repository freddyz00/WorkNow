import Image from "next/image";
import { useState } from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/router";

const MemberCard = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-56 p-3 bg-white rounded-md shadow-md hover:scale-105 transition ease-out">
      {children}
    </div>
  );
};

export default function Team({ members }) {
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
    <div className="p-3 grid grid-cols-5 gap-3 bg-neutral-100 h-full overflow-y-scroll">
      {/* add a member */}
      <MemberCard>
        <div
          className="flex flex-col justify-center items-center h-full w-full my-auto cursor-pointer"
          onClick={() => setIsInviteModalOpen(true)}
        >
          <div className="grid place-items-center w-[60px] h-[60px] mb-[7px] bg-gray-400 rounded-full">
            <p className="text-white text-5xl font-bold">+</p>
          </div>
          <p className="text-xl font-medium text-gray-400 mt-2">Invite</p>
        </div>
      </MemberCard>

      {/* team members */}
      {members.map(({ name, image, email }, index) => (
        <MemberCard key={index}>
          <div className="mt-8">
            <Image
              src={image}
              width={75}
              height={75}
              className="rounded-full"
            />
          </div>

          <p className="font-bold mt-4 break-all text-center">{name}</p>
          <p className="text-sm break-all text-center">{email}</p>
        </MemberCard>
      ))}

      {/* Invite a new member modal */}
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
