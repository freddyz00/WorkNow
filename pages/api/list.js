import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { pusher } from "../../lib/pusher";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { workspaceId, title, theme, id, updatedBy } = req.body;
    const client = await clientPromise;
    const db = client.db();

    pusher.trigger("private-workspaces", "new-list", {
      list: {
        id,
        title,
        theme,
        items: { itemsOrderIds: [] },
      },
      updatedBy,
    });

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
    const { workspaceId, newTitle, id, updatedBy } = req.body;
    const client = await clientPromise;
    const db = client.db();

    // dispatch(updateListTitle({ id, newTitle: titleInput }));

    pusher.trigger("private-workspaces", "update-list-title", {
      list: {
        id,
        newTitle,
      },
      updatedBy,
    });

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
