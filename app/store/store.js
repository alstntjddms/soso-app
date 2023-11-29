import { legacy_createStore as createStore } from "@reduxjs/toolkit";
import sosoAPI from "../components/framework/api/sosoAPI";

// 초기 상태 정의
const initialState = {
  Loading: "flex",
  showData: false,
  createData: false,
  TransLoading: "none",
  newTeamCreate: false,
  commonError: false,
  commonErrorInfo: { name: "", message: "", errorDate: "" },
  commonSuccess: false,
  commonSuccessInfo: { message: "" },

  teams: [],
  datas: {},
  data: {
    id: "",
    dataIndex: "",
    state: "",
    fromMemberId: "",
    toMemberId: "",
    teamId: "",
    title: "",
    content: "",
    delYn: false,
    regDate: "",
    updDate: "",
  },
};

function reducer(state = initialState, action) {
  const newState = { ...state };
  // state 변경
  switch (action.type) {
    case "openLoading":
      newState.Loading = "flex";
      break;
    case "closeLoading":
      newState.Loading = "none";
      break;
    case "openTransLoading":
      newState.TransLoading = "flex";
      break;
    case "closeTransLoading":
      newState.TransLoading = "none";
      break;
    case "setDatas":
      newState.datas = action.data;
      break;
    case "setData":
      newState.data = action.data;
      break;
    case "toggleShowData":
      newState.showData = !state.showData;
      break;
    case "toggleCreateData":
      newState.createData = !state.createData;
      break;
    case "toggleNewTeamCreate":
      newState.newTeamCreate = !state.newTeamCreate;
      break;
    case "toggleCommonError":
      newState.commonError = !state.commonError;
      newState.commonErrorInfo = action.data;
      break;
    case "toggleCommonSuccess":
      newState.commonSuccess = !state.commonSuccess;
      newState.commonSuccessInfo.message = action.data;
      break;
    case "setTeams":
      newState.teams = action.data;
      break;
  }
  return newState;
}

const store = createStore(reducer);
export default store;
