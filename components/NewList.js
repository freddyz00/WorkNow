import { useRef } from "react";
import randomColorGenerator from "../lib/utils";

export default function NewList({ addNewList }) {
  const titleRef = useRef();

  const theme = randomColorGenerator.generate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleRef.current.value) {
      addNewList({
        title: titleRef.current.value,
        theme,
      });
      titleRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col m-3 rounded-b-md">
      <div className="h-3 bg-slate-200" />
      <div className="flex flex-col w-80 h-fit p-3 bg-slate-100 border border-solid border-slate-200 rounded-b-md transition ease-out duration-300">
        <form onSubmit={handleSubmit}>
          <input
            ref={titleRef}
            type="text"
            placeholder="+ Add a new list "
            className="w-full text-lg font-semibold px-2 bg-transparent rounded-md cursor-pointer border-none outline-none transtion ease-out duration-300 hover:bg-slate-200 focus:bg-white focus:placeholder:text-white"
            onFocus={() => titleRef.current.select()}
          />
        </form>
      </div>
    </div>
  );
}
