import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { pusher } from "../../lib/pusher";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { text, sender, workspaceId } = req.body;
    const client = await clientPromise;
    const db = client.db();

    pusher.trigger("private-workspaces", "new-message", { sender, text });

    // add message to appropriate workspace
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $push: { messages: { text, sender } } }
    );

    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
