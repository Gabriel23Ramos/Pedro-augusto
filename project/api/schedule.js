import { isAuthenticated } from "./_lib/session.js";
import { redis, SCHEDULE_KEY, DEFAULT_SCHEDULE, DEFAULT_SLOTS } from "./_lib/redis.js";

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

function normalize(data) {
  return {
    blockedDays: Array.isArray(data?.blockedDays) ? data.blockedDays : [],
    blockedSlots:
      data?.blockedSlots && typeof data.blockedSlots === "object" ? data.blockedSlots : {},
    slots: Array.isArray(data?.slots) && data.slots.length ? data.slots : [...DEFAULT_SLOTS],
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
    const isTimeList = type === "addTime" || type === "removeTime";
    if (isTimeList) {
      if (typeof time !== "string" || !TIME_RE.test(time)) {
        res.status(400).json({ error: "Horário inválido." });
        return;
      }
    } else if (!date || (type !== "day" && type !== "slot")) {
      res.status(400).json({ error: "Requisição inválida." });
      return;
    } else if (type === "slot" && !time) {
      res.status(400).json({ error: "Horário ausente." });
      return;
    }

    const data = normalize((await redis.get(SCHEDULE_KEY)) || DEFAULT_SCHEDULE);

    if (type === "addTime") {
      if (!data.slots.includes(time)) data.slots.push(time);
      data.slots.sort();
    } else if (type === "removeTime") {
      if (data.slots.length > 1) data.slots = data.slots.filter((t) => t !== time);
    } else if (type === "day") {
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
