import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { lightColorGenerator } from "../lib/utils";

import { useDispatch } from "react-redux";
import { addList } from "../features/lists/listsSlice";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function NewList() {
  const titleRef = useRef();
  const [title, setTitle] = useState("");

  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const dispatch = useDispatch();

  const theme = lightColorGenerator.generate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = `list-${uuidv4()}`;
    if (title) {
      dispatch(addList({ id, title, theme, items: { itemsOrderIds: [] } }));

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list`, {
        id,
        workspaceId,
        title,
        theme,
      });

      setTitle("");
      titleRef.current.blur();
    }
  };

  return (
    <div className="flex flex-col m-3 rounded-b-md">
      <div className="h-3 bg-slate-200" />
      <div className="flex flex-col w-72 h-fit p-3 bg-slate-100 border border-solid border-slate-200 rounded-b-md transition ease-out duration-300">
        <form onSubmit={handleSubmit}>
          <input
            ref={titleRef}
            type="text"
            placeholder="+ Add a new list "
            className="w-full text-lg font-semibold px-2 bg-transparent rounded-md cursor-pointer border-none outline-none transtion ease-out duration-300 hover:bg-slate-200 focus:bg-white focus:placeholder:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => titleRef.current.select()}
          />
        </form>
      </div>
    </div>
  );
}
