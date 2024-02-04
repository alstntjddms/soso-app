import axios, { HttpStatusCode } from "axios";
import Cookies from "js-cookie";

const SERVER_URL = process.env.NEXT_PUBLIC_API;

export default class sosoAPI {
  static async get(url) {
    return await axios
      .get(SERVER_URL + url, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          alert("에러 발생");
        }
      })
      .catch((res) => {
        if (res.response.status === HttpStatusCode.BadRequest) {
          if (
            res.response.data.name === "COOKIES_NOT_FOUND" ||
            res.response.data.name === "JWT_FAIL_VALIDATE"
          ) {
            alert("로그인 정보를 잃었습니다.");
            Cookies.remove("sosoJwtToken");
            window.location.replace("/web/login");
          }
          return res;
        } else {
          alert("알수 없는 에러발생");
        }
      });
  }

  static async post(url, data) {
    return await axios
      .post(SERVER_URL + url, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          alert("에러 발생");
        }
      })
      .catch((res) => {
        if (res.response.status === HttpStatusCode.BadRequest) {
          if (
            res.response.data.name === "COOKIES_NOT_FOUND" ||
            res.response.data.name === "JWT_FAIL_VALIDATE"
          ) {
            alert("로그인 정보를 잃었습니다.");
            window.location.replace("/web/login");
          }
          return res;
        } else {
          alert("알수없는 에러");
        }
      });
  }

  static async patch(url, data) {
    return await axios
      .patch(SERVER_URL + url, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else {
          alert("에러 발생");
        }
      })
      .catch((res) => {
        if (res.response.status === HttpStatusCode.BadRequest) {
          if (
            res.response.data.name === "COOKIES_NOT_FOUND" ||
            res.response.data.name === "JWT_FAIL_VALIDATE"
          ) {
            alert("로그인 정보를 잃었습니다.");
            window.location.replace("/web/login");
          }
          return res;
        } else {
          alert("알수없는 에러");
        }
      });
  }
}
