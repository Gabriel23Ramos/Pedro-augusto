import { Redis } from "@upstash/redis";

// Reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, which Vercel
// injects automatically once an Upstash Redis database is connected to
// this project (Storage tab -> Create Database / Marketplace -> Redis).
export const redis = Redis.fromEnv();

export const SCHEDULE_KEY = "pedro-augusto:schedule";

export const DEFAULT_SCHEDULE = { blockedDays: [], blockedSlots: {} };
