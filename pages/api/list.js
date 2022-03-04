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

      {
        $set: {
          [`lists.${id}`]: {
            id,
            title,
            theme,
            items: { itemsOrderIds: [] },
          },
        },
        $push: { "lists.listsOrderIds": id },
      }
    );

    res.status(200).json({});
  } else if (req.method === "PUT") {
    const { workspaceId, newTitle, id } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // find appropriate list and update the title
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $set: { [`lists.${id}.title`]: newTitle } }
    );
    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
