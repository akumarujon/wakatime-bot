import { API_KEY, bot, LEADERBOARD_ID } from "../config/mod.ts";
import { WakaTime } from "../utils/wakatime.ts";

Deno.cron("daily statistic", "30 0 * * *", async () => {
    const wakatime = new WakaTime(API_KEY, LEADERBOARD_ID);
    let message = await wakatime.getLeaderBoard()

    message = message + `\n\n🏆 Top Languages 🏆`
    for(const language of await wakatime.getTopLanguages()) {
        message = message + `\n${language.language} - ${language.humanReadable}`
    }
    await bot.api.sendMessage(5560860031, message);
});
