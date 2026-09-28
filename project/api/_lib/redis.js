import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export const SCHEDULE_KEY = "pedro-augusto:schedule";

export const DEFAULT_SLOTS = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export const DEFAULT_SCHEDULE = { blockedDays: [], blockedSlots: {}, slots: DEFAULT_SLOTS };
