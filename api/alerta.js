let alarmaActiva = false;

export default function handler(req, res) {
  if (req.method === "POST") {
    alarmaActiva = true;
    return res.json({ ok: true, mensaje: "Alarma activada" });
  }

  if (req.method === "GET") {
    return res.json({ alarma: alarmaActiva });
  }

  if (req.method === "DELETE") {
    alarmaActiva = false;
    return res.json({ ok: true, mensaje: "Alarma desactivada" });
  }

  res.status(405).json({ error: "Método no permitido" });
}
