import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { item, workspaceId, title } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // add item to appropriate list
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $push: { "lists.$[elem].items": item } },
      { arrayFilters: [{ "elem.title": title }] }
    );

    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
