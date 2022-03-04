import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const {
      workspaceId,
      draggableId,
      draggableItem,
      sourceId,
      destinationId,
      sourceItemsOrderIds,
      destinationItemsOrderIds,
      sourceIndex,
      destinationIndex,
    } = req.body;
    const client = await clientPromise;
    const db = client.db();

    if (sourceId === destinationId) {
      sourceItemsOrderIds.splice(sourceIndex, 1);
      sourceItemsOrderIds.splice(destinationIndex, 0, draggableId);

      await db.collection("workspaces").updateOne(
        { _id: ObjectId(workspaceId) },
        {
          $set: {
            [`lists.${sourceId}.items.itemsOrderIds`]: sourceItemsOrderIds,
          },
        }
      );
    } else {
      sourceItemsOrderIds.splice(sourceIndex, 1);
      destinationItemsOrderIds.splice(destinationIndex, 0, draggableId);

      console.log("source", sourceItemsOrderIds);
      console.log("destination", destinationItemsOrderIds);

      await db.collection("workspaces").updateOne(
        { _id: ObjectId(workspaceId) },
        {
          $unset: { [`lists.${sourceId}.items.${draggableId}`]: "" },
          $set: {
            [`lists.${destinationId}.items.${draggableId}`]: draggableItem,
            [`lists.${sourceId}.items.itemsOrderIds`]: sourceItemsOrderIds,
            [`lists.${destinationId}.items.itemsOrderIds`]:
              destinationItemsOrderIds,
          },
        }
      );
    }

    res.status(200).json({});
  }
}

// workspaceId,
// draggableId,
// sourceId: source.droppableId,
// destinationId: destination.droppableId,
// sourceItemsOrderIds: data[source.id].items.itemsOrderIds,
// destinationItemsOrderIds: data[destination.id].items.itemsOrderIds,
// sourceIndex: source.index,
// destinationIndex: destination.index,
