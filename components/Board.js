import { useRouter } from "next/router";
import List from "./List";
import NewList from "./NewList";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  updateListsOrder,
  updateListItemsOrder,
} from "../features/lists/listsSlice";
import { signOut, useSession } from "next-auth/react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import axios from "axios";

export default function Board() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { workspace: workspaceId } = router.query;
  const lists = useSelector((state) => state.lists);
  const { data: session } = useSession();

  const onDragEnd = async (result) => {
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
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/itemsorder`, {
          workspaceId,
          draggableId,
          draggableItem: lists[source.droppableId].items[draggableId],
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceItemsOrderIds: lists[source.droppableId].items.itemsOrderIds,
          destinationItemsOrderIds:
            lists[destination.droppableId].items.itemsOrderIds,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          updatedBy: session.user,
        });

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
        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listsorder`, {
          workspaceId,
          draggableId,
          oldListsOrderIds: lists.listsOrderIds,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          updatedBy: session.user,
        });

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
            className="flex flex-1 max-h-full overflow-x-scroll px-5 bg-neutral-100"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lists.listsOrderIds.map((listId, index) => {
              const { id, title, theme, items } = lists[listId];
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
            {provided.placeholder}
            <NewList />
            <Button
              title="Sign Out"
              onPress={() => signOut({ callbackUrl: "/dashboard" })}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
