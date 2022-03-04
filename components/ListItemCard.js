import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateItem } from "../features/lists/listsSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteItem } from "../features/lists/listsSlice";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";

export default function Card({ item, listId, index }) {
  const { id, content } = item;
  const [inputText, setInputText] = useState(content);
  const inputRef = useRef();

  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateItem({
        listId,
        newItem: { ...item, content: inputText },
        oldItem: item,
      })
    );
    inputRef.current.blur();

    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item`, {
      listId,
      workspaceId,
      newItem: { ...item, content: inputText },
      oldItem: item,
    });
  };

  const handleDelete = async () => {
    dispatch(deleteItem({ listId, item }));

    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item`, {
      data: {
        listId,
        workspaceId,
        item,
      },
    });
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          onSubmit={handleSubmit}
          className="flex group items-center relative mb-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* <input
            className="bg-white p-2 w-full rounded-md cursor-pointer focus:bg-white hover:bg-slate-200 transition ease-out duration-300"
            type="text"
            value={inputText}
            ref={inputRef}
            onChange={(e) => setInputText(e.target.value)}
            onFocus={() => inputRef.current.select()}
          /> */}
          <p className="bg-white p-2 w-full rounded-md">{content}</p>

          <div
            onClick={handleDelete}
            className="absolute opacity-0 right-2 rounded-md p-1 text-red-500 border border-solid hover:border-red-500 active:bg-red-100 group-hover:opacity-100 text-xl cursor-pointer"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      )}
    </Draggable>

    // <form
    //   onSubmit={handleSubmit}
    //   className="flex group items-center relative mb-3"
    // >
    //   <input
    //     className="bg-white p-2 w-full rounded-md cursor-pointer focus:bg-white hover:bg-slate-200 transition ease-out duration-300"
    //     type="text"
    //     value={inputText}
    //     ref={inputRef}
    //     onChange={(e) => setInputText(e.target.value)}
    //     onFocus={() => inputRef.current.select()}
    //   />
    //   <div
    //     onClick={handleDelete}
    //     className="absolute opacity-0 right-2 rounded-md p-1 text-red-500 border border-solid hover:border-red-500 active:bg-red-100 group-hover:opacity-100 text-xl cursor-pointer"
    //   >
    //     <RiDeleteBin6Line />
    //   </div>
    // </form>
  );
}
