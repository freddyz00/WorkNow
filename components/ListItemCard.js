import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { updateItem } from "../features/lists/listsSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { deleteItem } from "../features/lists/listsSlice";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";
import cn from "classnames";

export default function Card({ item, listId, index }) {
  const { id, content } = item;
  const [inputText, setInputText] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  const { data: session } = useSession();

  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateItem({
        listId,
        itemId: id,
        newContent: inputText,
      })
    );
    inputRef.current.blur();

    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item`, {
      listId,
      workspaceId,
      itemId: id,
      newContent: inputText,
      updatedBy: session.user,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDelete = async () => {
    dispatch(deleteItem({ listId, item }));

    await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item`, {
      data: {
        listId,
        workspaceId,
        item,
        updatedBy: session.user,
      },
    });
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          onSubmit={handleSubmit}
          className="flex group items-center relative mb-3 px-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <form
            onSubmit={handleSubmit}
            className={cn("w-full h-full z-10", {
              inline: isEditing,
              hidden: !isEditing,
            })}
          >
            <input
              className="bg-slate-50 p-2 w-full rounded-md cursor-pointer break-all break-words focus:bg-slate-100 transition ease-out duration-300"
              type="text"
              value={inputText}
              ref={inputRef}
              autoFocus
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => inputRef.current.select()}
              onBlur={() => setIsEditing(false)}
            />
          </form>

          <p
            className={cn(
              "bg-slate-50 p-2 w-full rounded-md break-all hover:bg-slate-200",
              {
                hidden: isEditing,
              }
            )}
          >
            {content}
          </p>

          <div
            onClick={handleEdit}
            className="absolute opacity-0 right-[52px] rounded-md p-1 text-white bg-blue-500 border border-solid hover:border-blue-500 active:bg-blue-600 group-hover:opacity-100 text-xl cursor-pointer"
          >
            <BiEdit />
          </div>
          <div
            onClick={handleDelete}
            className="absolute opacity-0 right-5 rounded-md p-1 text-white bg-red-500 border border-solid hover:border-red-500 active:bg-red-600 group-hover:opacity-100 text-xl cursor-pointer"
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
