import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { pusher } from "../../lib/pusher";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { item, workspaceId, listId, updatedBy } = req.body;
    const client = await clientPromise;
    const db = client.db();

    pusher.trigger("private-workspaces", "new-item", {
      item: {
        listId: listId,
        item: item,
      },
      updatedBy,
    });

    // add item to appropriate list
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      {
        $push: { [`lists.${listId}.items.itemsOrderIds`]: item.id },
        $set: { [`lists.${listId}.items.${item.id}`]: item },
      }
    );

    res.status(200).json({});
  } else if (req.method === "PUT") {
    const { workspaceId, newContent, itemId, listId, updatedBy } = req.body;
    const client = await clientPromise;
    const db = client.db();

    pusher.trigger("private-workspaces", "update-item", {
      item: {
        listId,
        itemId,
        newContent,
      },
      updatedBy,
    });

    // find appropriate list and update the title
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      {
        $set: {
          [`lists.${listId}.items.${itemId}.content`]: newContent,
        },
      }
    );

    res.status(200).json({});
  } else if (req.method === "DELETE") {
    const { item, workspaceId, listId, updatedBy } = req.body;
    const client = await clientPromise;
    const db = client.db();

    pusher.trigger("private-workspaces", "delete-item", {
      item: {
        listId,
        item,
      },
      updatedBy,
    });

    // remove item from list
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      {
        $pull: { [`lists.${listId}.items.itemsOrderIds`]: item.id },
        $unset: { [`lists.${listId}.items.${item.id}`]: "" },
      }
    );

    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
