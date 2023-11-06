import { legacy_createStore as createStore } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  profile: "",
  currentPage: "",
  Loading: "flex",
  FcmModal: false,
  darkMode: true,
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
  }
  return newState;
}

const store = createStore(reducer);
export default store;
