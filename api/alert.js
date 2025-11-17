import Pusher from "pusher";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const pusher = new Pusher({
    appId: "2079081",
    key: "9d107dfd6c6872f19922",
    secret: "51d04d7d9adec62c4639",
    cluster: "mt1",
    useTLS: true,
  });

  await pusher.trigger("alarma-channel", "alarma-event", {
    message: "alarma!",
  });

  res.status(200).json({ ok: true });
}
