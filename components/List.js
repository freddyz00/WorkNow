import ListItemCard from "./ListItemCard";
import cn from "classnames";
import { useState, useRef } from "react";

export default function List({
  id,
  title,
  listItems,
  theme,
  addItem,
  updateListTitle,
}) {
  const newItemInputRef = useRef();
  const titleRef = useRef();
  const [titleInput, setTitleInput] = useState(title);

  const handleSubmitNewItem = (e) => {
    e.preventDefault();
    addItem(title, newItemInputRef.current.value);
    newItemInputRef.current.value = "";
    newItemInputRef.current.blur();
  };

  const handleSubmitTitle = (e) => {
    e.preventDefault();
    updateListTitle(id, titleInput);
    titleRef.current.blur();
  };

  return (
    <div className="flex flex-col m-3 rounded-b-md h-fit shadow-md">
      <div id="color" className="h-3" />
      <div className="flex flex-col w-80 h-fit p-3 bg-slate-100 border border-solid border-slate-200 rounded-b-md transition ease-out duration-300">
        <form onSubmit={handleSubmitTitle}>
          <input
            ref={titleRef}
            type="text"
            className="w-full text-lg font-semibold mb-3 px-2 bg-transparent rounded-md cursor-pointer border-none outline-none transtion ease-out duration-300 hover:bg-slate-200 focus:bg-white focus:placeholder:text-white"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onFocus={() => titleRef.current.select()}
          />
        </form>
        {listItems?.map((item, index) => (
          <ListItemCard key={index} item={item} />
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
    </div>
  );
}
