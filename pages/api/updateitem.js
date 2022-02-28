import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { workspaceId, newItem, oldItem, listTitle } = req.body;
    const client = await clientPromise;
    const db = client.db();
    console.log(req.body);

    // find appropriate list and update the title
    await db.collection("workspaces").updateOne(
      {
        _id: ObjectId(workspaceId),
      },
      { $set: { "lists.$[elem].items.$[item]": newItem } },
      { arrayFilters: [{ "elem.title": listTitle }, { item: oldItem }] }
    );

    res.status(200).json({});
  } else {
    res.status(200).json({});
  }
}
