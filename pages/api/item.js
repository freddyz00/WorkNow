import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { item, workspaceId, listId } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // add item to appropriate list
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $push: { "lists.$[elem].items": item } },
      { arrayFilters: [{ "elem.id": listId }] }
    );

    res.status(200).json({});
  } else if (req.method === "PUT") {
    const { workspaceId, newItem, oldItem, listId } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // find appropriate list and update the title
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $set: { "lists.$[elem].items.$[item]": newItem } },
      { arrayFilters: [{ "elem.id": listId }, { "item.id": oldItem.id }] }
    );

    res.status(200).json({});
  } else if (req.method === "DELETE") {
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
