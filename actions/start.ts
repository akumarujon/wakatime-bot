import { bot } from "../config/mod.ts";
import { kv } from "../utils/kv.ts";

bot.chatType("private").command("start", async (ctx) => {
  const entry = await kv.get<string[]>(["users"]);

  console.log(entry.value);

  if (!entry.value!.includes(ctx.from.id.toString())) {
    entry.value?.push(ctx.from.id.toString());

    await kv.set(["users"], entry.value);
  }

  await ctx.reply("Working!");
});
