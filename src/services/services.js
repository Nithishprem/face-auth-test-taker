import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  AUTH_TOKEN,
  AWARENESS_TASKS,
  AWARENESS_TASKS_BY_ID,
  CHECK_USER_EXISTS,
  GET_USER_PROFILE,
  LOGIN_REGISTER,
} from "../utils/apiEndpoints";

export const getAccessToken = async () => {
  console.log("access");
  const endPoint = AUTH_TOKEN;
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken) {
      throw new Error("Unautheticated!");
    }
    const decoded = jwt_decode(accessToken);
    const now = new Date().valueOf();

    console.log("now", new Date(now), new Date(decoded.exp * 1000));
    if (decoded.exp * 1000 < now) {
      if (!refreshToken) {
        throw new Error("Unautheticated!");
      } else {
        const res = await axios.put(
          endPoint,
          {},
          {
            headers: {
              refreshToken: refreshToken,
            },
          }
        );

        localStorage.setItem("accessToken", res?.data?.accessToken);
        localStorage.setItem("refreshToken", res?.data?.refreshToken);
        return localStorage.getItem("accessToken");
      }
    } else {
      return accessToken;
    }
  } catch (error) {
    console.log(error);
  }
};

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
  const token = await getAccessToken();
  const Authorization = "Bearer " + token;

  const res = await axios.post(endPoint, body, {
    headers: {
      Authorization,
    },
  });
  return res;
};

// export const updateAwareness = async ()=>{
//   const endP
// }

export const getAwarenessTasks = async () => {
  const endPoint = AWARENESS_TASKS;
  const token = await getAccessToken();
  const Authorization = "Bearer " + token;

  const res = await axios.get(endPoint, {
    headers: {
      Authorization,
    },
  });

  return res;
};

export const getAwarenessTasksById = async (id) => {
  const endPoint = AWARENESS_TASKS_BY_ID.replace("##id##", id);
  const token = await getAccessToken();
  const Authorization = "Bearer " + token;

  const res = await axios.get(endPoint, {
    headers: {
      Authorization,
    },
  });
  return res;
};

export const loginUser = async (body, token) => {
  const endpoint = AUTH_TOKEN;

  console.log("token", token);
  const options = {
    headers: {
      idToken: token,
    },
  };

  // console.log(options);
  const res = await axios.post(endpoint, {}, options);

  return res;
};

export const getUser = async () => {
  const endpoint = GET_USER_PROFILE;
  const token = await getAccessToken();
  const Authorization = "Bearer " + token;
  const res = await axios.get(endpoint, {
    headers: {
      Authorization,
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
