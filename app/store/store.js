import { legacy_createStore as createStore } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  // 로딩
  Loading: "flex",
  TransLoading: "none",

  // 공통 모달
  commonError: false,
  commonErrorInfo: { name: "", message: "", errorDate: "" },
  commonSuccess: false,
  commonSuccessInfo: { message: "" },

  // 모달
  showData: false,
  createData: false,
  newTeamCreate: false,

  // 데이터
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
  teams: [],
  teamMembers: [],
};

function reducer(state = initialState, action) {
  const newState = { ...state };
  // state 변경
  switch (action.type) {
    //로딩
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

    // 공통 모달
    case "toggleCommonError":
      newState.commonError = !state.commonError;
      newState.commonErrorInfo = action.data;
      break;
    case "toggleCommonSuccess":
      newState.commonSuccess = !state.commonSuccess;
      newState.commonSuccessInfo.message = action.data;
      break;

    // 모달
    case "toggleShowData":
      newState.showData = !state.showData;
      break;
    case "toggleCreateData":
      newState.createData = !state.createData;
      break;
    case "toggleNewTeamCreate":
      newState.newTeamCreate = !state.newTeamCreate;
      break;

    // 데이터
    case "setDatas":
      newState.datas = action.data;
      break;
    case "setData":
      newState.data = action.data;
      break;
    case "setTeams":
      newState.teams = action.data;
      break;
    case "setTeamMembers":
      newState.teamMembers = action.data;
      break;
  }

  return newState;
}

const store = createStore(reducer);
export default store;
