import { bot } from "../config/mod.ts";
import { wakatime } from "../utils/wakatime.ts";

bot.command("waka", async (ctx) => {
  const message = await wakatime.message();

  await ctx.reply(message);
});
