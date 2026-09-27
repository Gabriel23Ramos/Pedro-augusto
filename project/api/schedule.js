import { isAuthenticated } from "./_lib/session.js";
import { redis, SCHEDULE_KEY, DEFAULT_SCHEDULE } from "./_lib/redis.js";

function normalize(data) {
  return {
    blockedDays: Array.isArray(data?.blockedDays) ? data.blockedDays : [],
    blockedSlots:
      data?.blockedSlots && typeof data.blockedSlots === "object" ? data.blockedSlots : {},
  };
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = normalize((await redis.get(SCHEDULE_KEY)) || DEFAULT_SCHEDULE);
    res.status(200).json(data);
    return;
  }

  if (req.method === "POST") {
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Não autenticado." });
      return;
    }

    const { type, date, time } = req.body || {};
    if (!date || (type !== "day" && type !== "slot")) {
      res.status(400).json({ error: "Requisição inválida." });
      return;
    }
    if (type === "slot" && !time) {
      res.status(400).json({ error: "Horário ausente." });
      return;
    }

    const data = normalize((await redis.get(SCHEDULE_KEY)) || DEFAULT_SCHEDULE);

    if (type === "day") {
      const idx = data.blockedDays.indexOf(date);
      if (idx >= 0) data.blockedDays.splice(idx, 1);
      else data.blockedDays.push(date);
    } else {
      const list = data.blockedSlots[date] || [];
      const idx = list.indexOf(time);
      if (idx >= 0) list.splice(idx, 1);
      else list.push(time);
      if (list.length === 0) delete data.blockedSlots[date];
      else data.blockedSlots[date] = list;
    }

    await redis.set(SCHEDULE_KEY, data);
    res.status(200).json(data);
    return;
  }

  res.status(405).json({ error: "Método não permitido" });
}
