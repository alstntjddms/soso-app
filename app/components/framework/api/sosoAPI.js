import axios from "axios";

const SERVER_URL = "http://localhost/api";

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
        if (res.response.status === 400) {
          // CustomException 예외
          alert(res.response.data.name);
          console.log(res.response.data.name);
          console.log(res.response.data.message);
          console.log(res.response.data.errorDate);
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
        if (res.response.status === 400) {
          // CustomException 예외
          alert(res.response.data.name);
          console.log(res.response.data.name);
          console.log(res.response.data.message);
          console.log(res.response.data.errorDate);
        } else {
          alert("알수 없는 에러발생");
        }
      });
  }
}
