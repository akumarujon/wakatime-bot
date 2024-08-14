import { bot } from "../config/mod.ts";

bot.command("start", async (ctx) => {
  await ctx.reply("Working!");
});
