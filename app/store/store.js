import { legacy_createStore as createStore } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = {
  profile: "",
  currentPage: "",
  Loading: "flex",
  TransLoading: "none",
  FcmModal: false,
  darkMode: true,
  showData: false,
  createData: false,
  newTeamCreate: false,

  datas: {
    요청: [
      {
        seq: 1,
        title: "타이틀1",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-1"}]}]}',
        index: 0,
      },
      {
        seq: 2,
        title: "타이틀2",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-1"}]}]}',
        index: 1,
      },
      {
        seq: 8,
        title: "타이틀3",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-2"}]}]}',
        index: 2,
      },
      {
        seq: 9,
        title: "타이틀4",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-3"}]}]}',
        index: 3,
      },
      {
        seq: 10,
        title: "타이틀5",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-4"}]}]}',
        index: 4,
      },
      {
        seq: 11,
        title: "타이틀6",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 1-5"}]}]}',
        index: 5,
      },
    ],
    진행중: [
      {
        seq: 3,
        title: "타이틀7",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 2-1"}]}]}',
        index: 0,
      },
      {
        seq: 4,
        title: "타이틀8",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 2-2"}]}]}',
        index: 1,
      },
    ],
    검토요청: [
      {
        seq: 12,
        title: "타이틀9",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 3-1"}]}]}',
        index: 0,
      },
      {
        seq: 13,
        title: "타이틀10",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 3-2"}]}]}',
        index: 1,
      },
    ],
    완료: [
      {
        seq: 5,
        title: "타이틀11",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 4-1"}]}]}',
        index: 0,
      },
      {
        seq: 6,
        title: "타이틀12",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 4-2"}]}]}',
        index: 1,
      },
      {
        seq: 7,
        title: "타이틀13",
        content:
          '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"테스트 콘텐트 4-3"}]}]}',
        index: 2,
      },
    ],
  },
  data: {
    seq: 0,
    title: "",
    content: "",
    index: 0,
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
    case "openTransLoading":
      newState.TransLoading = "flex";
      break;
    case "closeTransLoading":
      newState.TransLoading = "none";
      break;
    case "toggleFcmModal":
      newState.FcmModal = !state.FcmModal;
      break;
    case "toggleDarkMode":
      newState.darkMode = !state.darkMode;
      break;
    case "setDatas":
      console.log("datas");
      console.log(action.data);
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
  }
  return newState;
}

const store = createStore(reducer);
export default store;
