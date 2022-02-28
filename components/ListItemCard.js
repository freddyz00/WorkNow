import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateItem } from "../features/lists/listsSlice";
import axios from "axios";

export default function Card({ item, listTitle }) {
  const [inputText, setInputText] = useState(item);
  const inputRef = useRef();

  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateItem({ listTitle, newItem: inputText, oldItem: item }));
    inputRef.current.blur();

    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateitem`, {
      listTitle,
      workspaceId,
      newItem: inputText,
      oldItem: item,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="bg-white mb-3 p-2 w-full rounded-md cursor-pointer focus:bg-white hover:bg-slate-200 transition ease-out duration-300"
        type="text"
        value={inputText}
        ref={inputRef}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => inputRef.current.select()}
      />
    </form>
  );
}
