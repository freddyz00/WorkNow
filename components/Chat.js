import Image from "next/image";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../features/messages/messagesSlice";
import axios from "axios";

const Message = ({ text, sender, reference }) => {
  return (
    <div className="flex items-start mb-5" ref={reference}>
      {/* profile picture */}
      <div className="mr-5">
        <Image src={sender.image} height={35} width={35} />
      </div>
      <div className="flex flex-col">
        {/* name */}
        <p className="text-lg font-bold leading-none mb-1">{sender.name}</p>
        {/* message */}
        <p>{text}</p>
      </div>
    </div>
  );
};

export default function Chat({ data }) {
  const session = useSession();
  const user = session.data.user;
  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const lastRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputText) {
      // dispatch action to update store
      dispatch(addMessage({ sender: user, text: inputText }));

      // add to database
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/newmessage`, {
        workspaceId,
        text: inputText,
        sender: user,
      });

      lastRef.current?.scrollIntoView({ behavior: "smooth" });
      setInputText("");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* chat body */}
      <section className="px-20 pb-10 pt-5 mb-3">
        {data.map(({ text, sender }, index) => {
          const lastMessage = data.length - 1 === index;
          return (
            <div ref={lastMessage ? lastRef : null}>
              <Message key={index} text={text} sender={sender} />
            </div>
          );
        })}
      </section>
      {/* chat input */}
      <form
        onSubmit={sendMessage}
        className="absolute bottom-5 right-20 left-20"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-5 py-2 rounded-full bg-slate-200 border-none outline-none"
        />
      </form>
    </div>
  );
}
