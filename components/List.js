import ListItemCard from "./ListItemCard";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addItem, updateListTitle } from "../features/lists/listsSlice";
import axios from "axios";

export default function List({ id, title, listItems, theme }) {
  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const newItemInputRef = useRef();
  const titleRef = useRef();
  const [titleInput, setTitleInput] = useState(title);
  const dispatch = useDispatch();

  const handleSubmitNewItem = async (e) => {
    e.preventDefault();
    if (newItemInputRef.current.value) {
      const tempItem = newItemInputRef.current.value;
      dispatch(addItem({ title, item: newItemInputRef.current.value }));
      newItemInputRef.current.value = "";
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/newitem`, {
        item: tempItem,
        workspaceId,
        title,
      });
    }
  };

  const handleSubmitTitle = async (e) => {
    e.preventDefault();
    dispatch(updateListTitle({ id, newTitle: titleInput }));
    titleRef.current.blur();
    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updatelisttitle`, {
      workspaceId,
      newTitle: titleInput,
      id,
    });
  };

  return (
    <section className="flex flex-col m-3 rounded-b-md h-fit max-h-full shadow-md">
      <div id="color" className="h-3" />
      <div className="flex flex-col w-80 h-fit max-h-full p-3 bg-slate-100 border border-solid border-slate-200 rounded-b-md transition ease-out duration-300">
        <form onSubmit={handleSubmitTitle}>
          <input
            ref={titleRef}
            type="text"
            className="w-full text-lg font-semibold mb-3 px-2 bg-transparent rounded-md cursor-pointer border-none outline-none transtion ease-out duration-300 hover:bg-slate-200 focus:bg-white"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onFocus={() => titleRef.current.select()}
          />
        </form>

        {listItems?.map((item, index) => (
          <ListItemCard key={index} item={item} listTitle={title} />
        ))}

        <form onSubmit={handleSubmitNewItem}>
          <input
            ref={newItemInputRef}
            className="w-full p-2 bg-transparent rounded-md cursor-pointer border-none outline-none transition ease-out duration-300 placeholder:text-slate-500 hover:bg-slate-200 focus:bg-white focus:placeholder:text-white"
            type="text"
            placeholder="+ Add a new item"
            onBlur={handleSubmitNewItem}
            onFocus={() => newItemInputRef.current.select()}
          />
        </form>
      </div>

      <style jsx>{`
        #color {
          background-color: ${theme};
        }
      `}</style>
    </section>
  );
}
