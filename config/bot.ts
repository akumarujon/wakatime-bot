import { Bot } from "../deps.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);
export const instance = await bot.api.getMe();

export const API_KEY = Deno.env.get("API_KEY") as string;
export const LEADERBOARD_ID = Deno.env.get("LEADERBOARD_ID") as string;
