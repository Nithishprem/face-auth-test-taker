import axios from "axios";
import {
  AUTH_TOKEN,
  AWARENESS_TASKS,
  CHECK_USER_EXISTS,
  GET_USER_PROFILE,
  LOGIN_REGISTER,
} from "../utils/apiEndpoints";

export const userLoginRegister = async (body, idToken) => {
  const endPoint = LOGIN_REGISTER;
  const res = await axios.post(endPoint, body, {
    headers: {
      idToken: idToken,
    },
  });

  return res;
};

export const createAwarenessTask = async (body) => {
  const endPoint = AWARENESS_TASKS;
  const res = await axios.post(endPoint, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res;
};

export const loginUser = async (body, token) => {
  const endpoint = AUTH_TOKEN;

  console.log("token", token);
  const res = await axios.post(
    endpoint,
    {},
    {
      headers: {
        idToken: token,
      },
    }
  );

  return res;
};

export const getUser = async () => {
  const endpoint = GET_USER_PROFILE;
  const res = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res;
};

export const postUserExists = async (number) => {
  const endPoint = CHECK_USER_EXISTS;
  const res = await axios.post(endPoint, {
    phone_number: number,
  });

  return res;
};
