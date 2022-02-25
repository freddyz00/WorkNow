import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, title, theme } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // add workspace to workspaces collection
    const result = await db.collection("workspaces").insertOne({
      title,
      theme,
      items: [],
    });

    const workspaceId = result.insertedId.toString();

    // add workspace to users collection
    await db.collection("users").updateOne(
      { _id: ObjectId(userId) },
      {
        $push: {
          workspaces: { title, theme, id: workspaceId },
        },
      }
    );

    res.status(200).json({ id: workspaceId });
  } else {
    res.status(200).json({});
  }
}
