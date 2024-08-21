import { bot } from "../config/bot.ts";
import { kv } from "../utils/kv.ts";
import { wakatime } from "../utils/wakatime.ts";

Deno.cron("daily statistic", "30 0 * * *", async () => {
  const message = await wakatime.message();

  const users = await kv.get<string[]>(["users"]);

  for (const user of users.value!) await bot.api.sendMessage(user, message);
});
