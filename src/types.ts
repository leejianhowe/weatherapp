export interface FormState {
  city: string;
  country: string;
}

export interface WeatherDataType {
  main: {
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  name: string;
  dt: number;
  sys: {
    country: string;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}
export enum ErrorMessage {
  NOT_FOUND = "city not found",
  NO_INPUT = "please fill up the fields",
  SNA = "please try again later",
}

export interface SearchHistoryItem extends FormState{
  time: number
}