import { pusher } from "../../../lib/pusher";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  }
}
