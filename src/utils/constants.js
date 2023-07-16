import nithish from "../assets/images/nithish3.jpeg";

export const USER = {
  number: import.meta.env.VITE_NUMBER,
  name: "John",
  img: nithish,
};

export const routes = {
  login: "/login",
};

export const BEST_MATCH_DISTANCE = 0.6;

export const BEST_MATCH_DISTANCE_VIGILANCE = 0.65;
