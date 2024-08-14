export type City = {
  id: string;
  name: string;
  ascii_name: string;
  state: string;
  ascii_state: string;
  country_code?: string;
  population: number;
  timezone: string;
  country: string;
  title: string;
  title_including_country: string;
};

export type User = {
  id: string;
  display_name: string;
  username: string;
  full_name: string;
  website: string;
  human_readable_website: string;
  location: string | null;
  photo: string;
  photo_public: boolean;
  email: string | null;
  is_email_public: boolean;
  is_hireable: boolean;
  city: City;
};

export type Language = {
  name: string;
  total_seconds: number;
};

export type RunningTotal = {
  total_seconds: number;
  human_readable_total: string;
  daily_average: number;
  human_readable_daily_average: string;
  languages: Language[];
};

export type WakaTimeData = {
  user: User;
  running_total: RunningTotal;
  rank: number;
};
