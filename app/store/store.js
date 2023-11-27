import { legacy_createStore as createStore } from "@reduxjs/toolkit";

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

  datas: {
    요청: [
      {
        id: 1,
        title: "타이틀1",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-1"}]}]}',
        index: 0,
      },
      {
        id: 2,
        title: "타이틀2",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-1"}]}]}',
        index: 1,
      },
      {
        id: 8,
        title: "타이틀3",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-2"}]}]}',
        index: 2,
      },
      {
        id: 9,
        title: "타이틀4",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-3"}]}]}',
        index: 3,
      },
      {
        id: 10,
        title: "타이틀5",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-4"}]}]}',
        index: 4,
      },
      {
        id: 11,
        title: "타이틀6",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-5"}]}]}',
        index: 5,
      },
    ],
    진행중: [
      {
        id: 3,
        title: "타이틀7",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 2-1"}]}]}',
        index: 0,
      },
      {
        id: 4,
        title: "타이틀8",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 2-2"}]}]}',
        index: 1,
      },
    ],
    검토요청: [
      {
        id: 12,
        title: "타이틀9",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 3-1"}]}]}',
        index: 0,
      },
      {
        id: 13,
        title: "타이틀10",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 3-2"}]}]}',
        index: 1,
      },
    ],
    완료: [
      {
        id: 5,
        title: "타이틀11",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 4-1"}]}]}',
        index: 0,
      },
      {
        id: 6,
        title: "타이틀12",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 4-2"}]}]}',
        index: 1,
      },
      {
        id: 7,
        title: "타이틀13",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 4-3"}]}]}',
        index: 2,
      },
    ],
  },
  data: {
    id: 0,
    title: "",
    content: "",
    index: 0,
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
