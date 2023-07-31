import nithish from "../assets/images/nithish3.jpeg";
import vishwa from "../assets/images/vishwa.jpeg";

export const USER = {
  number: import.meta.env.VITE_NUMBER,
  name: "Nithish",
  img: nithish,
};

export const USERS = [
  {
    number: "7028894442",
    name: "Vishwajeet",
    img: vishwa,
  },
  {
    number: "6281594686",
    name: "Nithish",
    img: nithish,
  },
];

export const routes = {
  login: "/login",
};

export const BEST_MATCH_DISTANCE = 0.45;

export const BEST_MATCH_DISTANCE_VIGILANCE = 0.5;

export const ROAD_SAFETY_VIDEO = import.meta.env.VITE_VIDEO;
