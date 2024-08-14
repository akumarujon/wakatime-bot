import { API_KEY, bot, LEADERBOARD_ID } from "../config/mod.ts";
import { WakaTime } from "../utils/wakatime.ts";

Deno.cron("daily statistic", "* * * * *", async () => {
    const wakatime = new WakaTime(API_KEY, LEADERBOARD_ID);
    let message = await wakatime.leaderBoard()

    message = message + `\n\n🏆 Top Languages 🏆`
    for(const language of await wakatime.topLanguages()) {
        message = message + `\n${language.language} - ${language.humanReadable}`
    }
    await bot.api.sendMessage(5560860031, message);
});
