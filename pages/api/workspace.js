import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user, title, theme } = req.body;
    const client = await clientPromise;
    const db = client.db();

    const listsOrderIds = [
      `list-${uuidv4()}`,
      `list-${uuidv4()}`,
      `list-${uuidv4()}`,
    ];

    // add workspace to workspaces collection
    const result = await db.collection("workspaces").insertOne({
      title,
      theme,
      lists: {
        listsOrderIds,
        [listsOrderIds[0]]: {
          id: listsOrderIds[0],
          title: "To-Do",
          theme: "rgb(147 197 253)",
          items: { itemsOrderIds: [] },
        },
        [listsOrderIds[1]]: {
          id: listsOrderIds[1],
          title: "Doing",
          theme: "rgb(249 168 212)",
          items: { itemsOrderIds: [] },
        },
        [listsOrderIds[2]]: {
          id: listsOrderIds[2],
          title: "Done",
          theme: "rgb(134 239 172)",
          items: { itemsOrderIds: [] },
        },
      },
      messages: [],
      createdAt: new Date(),
      createdBy: { user },
      members: [],
    });

    const workspaceId = result.insertedId.toString();

    // add workspace to users collection
    await db.collection("users").updateOne(
      { _id: ObjectId(user.id) },
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
