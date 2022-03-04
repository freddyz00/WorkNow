import List from "./List";
import NewList from "./NewList";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import {
  updateListsOrder,
  updateListItemsOrder,
} from "../features/lists/listsSlice";
import { signOut } from "next-auth/react";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

export default function Board({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);
  });

  const onDragEnd = (result) => {
    const { draggableId, source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    switch (type) {
      case "item":
        dispatch(
          updateListItemsOrder({
            draggableId: draggableId,
            sourceId: source.droppableId,
            destinationId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
        return;

      case "list":
        dispatch(
          updateListsOrder({
            draggableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          })
        );
        return;
      default:
        return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="list">
        {(provided) => (
          <div
            className="flex flex-1 max-h-full overflow-x-scroll px-5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.listsOrderIds.map((listId, index) => {
              const { id, title, theme, items } = data[listId];
              return (
                <List
                  id={id}
                  key={id}
                  index={index}
                  title={title}
                  listItems={items}
                  theme={theme}
                />
              );
            })}
            <NewList />
            {/* <Button
              title="Sign Out"
              onPress={() => signOut({ callbackUrl: "/dashboard" })}
            /> */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
