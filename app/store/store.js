import { legacy_createStore as createStore } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  profile: "",
  currentPage: "",
  Loading: "flex",
  FcmModal: false,
  darkMode: true,
  items: {
    요청: [
      { seq: 1, title: "타이틀1", content: "테스트 콘텐트 1-1", index: 0 },
      { seq: 2, title: "타이틀2", content: "테스트 콘텐트 1-2", index: 1 },
      { seq: 8, title: "타이틀3", content: "테스트 콘텐트 1-3", index: 2 },
      { seq: 9, title: "타이틀4", content: "테스트 콘텐트 1-4", index: 3 },
      { seq: 10, title: "타이틀5", content: "테스트 콘텐트 1-5", index: 4 },
      { seq: 11, title: "타이틀6", content: "테스트 콘텐트 1-6", index: 5 },
    ],
    진행중: [
      { seq: 3, title: "타이틀7", content: "테스트 콘텐트 2-1", index: 0 },
      { seq: 4, title: "타이틀8", content: "테스트 콘텐트 2-2", index: 1 },
    ],
    완료: [
      { seq: 5, title: "타이틀9", content: "테스트 콘텐트 3-1", index: 0 },
      { seq: 6, title: "타이틀10", content: "테스트 콘텐트 3-2", index: 1 },
      { seq: 7, title: "타이틀11", content: "테스트 콘텐트 3-3", index: 2 },
    ],
  },
};

function reducer(state = initialState, action) {
  const newState = { ...state };
  // state 변경
  switch (action.type) {
    case "setProfile":
      newState.profile = action.data;
      break;
    case "setCuurentPage":
      newState.currentPage = action.data;
      break;
    case "openLoading":
      newState.Loading = "flex";
      break;
    case "closeLoading":
      newState.Loading = "none";
      break;
    case "toggleFcmModal":
      newState.FcmModal = !state.FcmModal;
      break;
    case "toggleDarkMode":
      newState.darkMode = !state.darkMode;
    case "setItems":
      newState.items = action.data;
  }
  return newState;
}

const store = createStore(reducer);
export default store;
