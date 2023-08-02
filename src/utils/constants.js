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

export const VIOLATION_TYPES = [
  {
    value: "SINGAL_JUMP",
    label: "SINGAL_JUMP",
  },
  {
    value: "NO_HELMET",
    label: "NO_HELMET",
  },
  {
    value: "OVER_SPEED",
    label: "OVER_SPEED",
  },
  {
    value: "GENERAL",
    label: "GENERAL",
  },
  {
    value: "OTHERS",
    label: "OTHERS",
  },
];

export const MSG91_AUTH_KEY = import.meta.env.VITE_MSG91_AUTH_KEY;

export const ROUTES = {
  admin: {
    login: "/admin/phone-login",
    listTasks: "/admin/listTasks",
    createTask: "/admin/createTask",
  },
  user: {
    login: "/user/phone-login",
    assessment: "/user/assessment/:id",
    taskNotFound: "/user/taskNotFound",
  },
};
