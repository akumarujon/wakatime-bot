import { bot } from "../config/mod.ts";
import { wakatime } from "../utils/wakatime.ts";

bot.on("inline_query", async(ctx) => {
    const message = await wakatime.message();

    await ctx.answerInlineQuery([
        {
            type: "article",
            id: "1",
            title: "WakaTime Leaderboard",
            description: "я хз что писать тут",
            input_message_content: {
                message_text: message
            }
        }
    ])
})