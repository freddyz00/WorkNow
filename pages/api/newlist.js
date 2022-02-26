import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { workspaceId, title, theme, id } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // add list to appropriate workspace
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $push: { lists: { id, title, theme, items: [] } } }
    );

    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
