import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.CHANNELS_APP_ID,
  key: process.env.CHANNELS_KEY,
  secret: process.env.CHANNELS_SECRET,
  cluster: process.env.CHANNELS_CLUSTER,
  useTLS: true,
});
