import { WakaTimeData, Language } from "../types.ts";
import { getCountryEmoji } from "./emoji.ts";

export class WakaTime {
    private readonly apiKey: string;
    private readonly leaderboardId: string;
    private languages = new Map<string, { time: number; humanReadable: string }>();

    constructor(apiKey: string, leaderboardId: string) {
        this.apiKey = apiKey;
        this.leaderboardId = leaderboardId;
    }

    private async fetchData(): Promise<WakaTimeData[]> {
        const response = await fetch(
            `https://wakatime.com/api/v1/users/current/leaderboards/${this.leaderboardId}`,
            {
                headers: {
                    "Authorization": `Basic ${btoa(this.apiKey)}`,
                },
            },
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    }

    async getLeaderBoard(): Promise<string> {
        const datas = await this.fetchData();
        return datas.map(data => {
            const name = data.user.full_name || data.user.username || "Unknown User";
            const total = data.running_total.human_readable_total || "0 secs";
            const emoji = getCountryEmoji(data.user.city?.country_code);
            return `${data.rank}. ${emoji} ${name} - ${total}`;
        }).join("\n");
    }

    async getTopLanguages(): Promise<{ language: string; time: number; humanReadable: string }[]> {
        const datas = await this.fetchData();

        datas.forEach(data => {
            data.running_total.languages.forEach((language: Language) => {
                const current = this.languages.get(language.name) || { time: 0, humanReadable: '' };
                const newTime = current.time + language.total_seconds;
                this.languages.set(language.name, {
                    time: newTime,
                    humanReadable: this.humanReadable(newTime)
                });
            });
        });

        return Array.from(this.languages.entries())
            .map(([language, { time, humanReadable }]) => ({ language, time, humanReadable }))
            .sort((a, b) => b.time - a.time)
            .slice(0, 10);
    }

    private humanReadable(time: number): string {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        return `${hours} hrs ${minutes} mins`;
    }
}