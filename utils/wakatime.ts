import { WakaTimeData } from "../types.ts";
import { getCountryEmoji } from "./emoji.ts";
export class WakaTime {
    private api_key: string
    private leaderboard_id: string
    public languages = new Map();
    public topLangs = []

    constructor(api_key: string, leaderboard_id: string ){
        this.api_key = api_key
        this.leaderboard_id = leaderboard_id
    }

    async fetchData(): Promise<WakaTimeData[]> {
        const response = await fetch(
            `https://wakatime.com/api/v1/users/current/leaderboards/${this.leaderboard_id}`,
            {
              headers: {
                "Authorization": `Basic ${btoa(this.api_key)}`,
              },
            },
          );
          
          return (await response.json()).data;
    }

    async leaderBoard(): Promise<string> {
        const response = await fetch(
          `https://wakatime.com/api/v1/users/current/leaderboards/${this.leaderboard_id}`,
          {
            headers: {
              "Authorization": `Basic ${btoa(this.api_key)}`,
            },
          },
        );
      
        const datas: WakaTimeData[] = (await response.json()).data;
        let result = "";
        for (const data of datas) {
          const name = data.user.full_name || data.user.username || "Unknown User";
          const total = data.running_total.human_readable_total || "0 secs";
      
          const emoji = getCountryEmoji(data.user.city?.country_code);
      
          result = result + "\n" +
            `${data.rank}. ${emoji} ${name} - ${total}`;
        }
      
      
      
        return result;
      };
      

    async topLanguages(): Promise<{language: string, time: string, humanReadable: string}[]> {
        const datas = await this.fetchData();

        for(const data of datas){
            
            for(const language of data.running_total.languages) {
                if(!this.languages.has(language.name)) {
                    this.languages.set(language.name, {time: language.total_seconds, humanReadable: this.humanReadable(language.total_seconds)})
                }

                const oldLanguage = this.languages.get(language.name)
                this.languages.set(language.name, {name: language.name,time: oldLanguage.time + language.total_seconds, humanReadable: this.humanReadable(oldLanguage.time + language.total_seconds)})
            }

        }

        for(const time of this.languages.values()) {
            // @ts-ignore xz
            this.topLangs.push(time.time)
        }

        this.topLangs = this.topLangs.sort((a, b) => b - a).slice(0, 10)

        const result = []

        for(const time of this.languages.values()) {
            // @ts-ignore xz
            if(this.topLangs.includes(time.time)) {
                result.push({language: time.name, time: time.time, humanReadable: this.humanReadable(time.time)})
            }
        }
        return result
    }

    /**
     * Converts the given seconds to human readable hours and mins.
     * @param time [number]
     * @returns string 
     */
    humanReadable(time: number): string {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);

        return `${hours} hrs ${minutes} mins`;
    }

}

