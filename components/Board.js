import List from "./List";
import NewList from "./NewList";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { updateListOrder } from "../features/lists/listsSlice";
import { signOut } from "next-auth/react";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect } from "react";

export default function Board({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("data changes", data);
  }, [data]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const draggableItem = data.find((list) => list.id === source.droppableId)
      .items[source.index];

    dispatch(
      updateListOrder({
        draggableItem: draggableItem,
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-1 max-h-full overflow-x-scroll px-5">
        {data.map(({ id, title, theme, items }) => (
          <List
            id={id}
            key={id}
            title={title}
            listItems={items}
            theme={theme}
          />
        ))}
        <NewList />
        <Button
          title="Sign Out"
          onPress={() => signOut({ callbackUrl: "/dashboard" })}
        />
      </div>
    </DragDropContext>
  );
}
