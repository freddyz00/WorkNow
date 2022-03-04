import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const {
      workspaceId,
      draggableId,
      oldListsOrderIds,
      sourceIndex,
      destinationIndex,
    } = req.body;
    const client = await clientPromise;
    const db = client.db();

    oldListsOrderIds.splice(sourceIndex, 1);
    oldListsOrderIds.splice(destinationIndex, 0, draggableId);

    await db.collection("workspaces").updateOne(
      { _id: ObjectId(workspaceId) },
      {
        $set: { "lists.listsOrderIds": oldListsOrderIds },
      }
    );

    res.status(200).json({});
  }
}
