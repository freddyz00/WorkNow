import ListItemCard from "./ListItemCard";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addItem, updateListTitle } from "../features/lists/listsSlice";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSession } from "next-auth/react";

export default function List({ id, title, listItems, theme, index }) {
  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const { data: session } = useSession();
  const newItemInputRef = useRef();
  const titleRef = useRef();
  const [titleInput, setTitleInput] = useState(title);
  const dispatch = useDispatch();

  const handleSubmitNewItem = async (e) => {
    e.preventDefault();
    if (newItemInputRef.current.value) {
      const tempContent = newItemInputRef.current.value;
      const itemId = `item-${uuidv4()}`;
      dispatch(
        addItem({
          listId: id,
          item: {
            id: itemId,
            content: newItemInputRef.current.value,
          },
        })
      );
      newItemInputRef.current.value = "";
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/item`, {
        item: { id: itemId, content: tempContent },
        workspaceId,
        listId: id,
        updatedBy: session.user,
      });
    }
  };

  const handleSubmitTitle = async (e) => {
    e.preventDefault();
    dispatch(updateListTitle({ id, newTitle: titleInput }));
    titleRef.current.blur();
    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list`, {
      workspaceId,
      newTitle: titleInput,
      id,
      updatedBy: session.user,
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <section
          className="flex flex-col m-3 rounded-b-md h-fit shadow-md"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            id="color"
            className="h-3 shrink-0"
            {...provided.dragHandleProps}
          />
          <div className="flex flex-col w-72 py-3 bg-white border border-solid border-slate-200 rounded-b-md transition ease-out duration-300">
            <form onSubmit={handleSubmitTitle} className="px-3">
              <input
                ref={titleRef}
                type="text"
                className="w-full font-semibold mb-3 px-2 bg-transparent rounded-md cursor-pointer border-none outline-none transtion ease-out duration-300 hover:bg-slate-200 focus:bg-white"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onFocus={() => titleRef.current.select()}
              />
            </form>
            <Droppable droppableId={id} type="item">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[1px] max-h-96 overflow-y-auto"
                >
                  {listItems.itemsOrderIds.map((itemId, index) => {
                    const item = listItems[itemId];
                    return (
                      <ListItemCard
                        key={item.id}
                        item={item}
                        listId={id}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <form onSubmit={handleSubmitNewItem} className="px-3">
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
      )}
    </Draggable>
  );
}
