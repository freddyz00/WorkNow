import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { item, workspaceId, listId } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // remove item from list
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $pull: { "lists.$[elem].items": item } },
      { arrayFilters: [{ "elem.id": listId }] }
    );

    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
