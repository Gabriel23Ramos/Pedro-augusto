import { Redis } from "@upstash/redis";

// Vercel's Upstash integration named these KV_REST_API_URL / KV_REST_API_TOKEN
// (legacy "Vercel KV" naming), rather than UPSTASH_REDIS_REST_URL/TOKEN, so we
// build the client explicitly instead of relying on Redis.fromEnv().
export const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export const SCHEDULE_KEY = "pedro-augusto:schedule";

export const DEFAULT_SCHEDULE = { blockedDays: [], blockedSlots: {} };
