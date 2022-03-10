import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { workspaceId, email } = req.body;

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({
      email: email,
    });

    if (user) {
      const workspace = await db.collection("workspaces").findOne({
        _id: ObjectId(workspaceId),
      });

      console.log(user);

      await db.collection("users").updateOne(
        {
          _id: user._id,
        },
        {
          $push: {
            workspaces: {
              title: workspace.title,
              theme: workspace.theme,
              id: workspaceId,
            },
          },
        }
      );

      await db.collection("workspaces").updateOne(
        {
          _id: ObjectId(workspaceId),
        },
        {
          $push: { members: user },
        }
      );
    } else {
      res.status(400).json({ user: null });
    }

    res.status(200).json({});
  }
}
