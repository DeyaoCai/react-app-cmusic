import {cmusichomeFns} from "../actions/index.js";

const cmusichome = (state, action) => {
  state || (state= {
    songSheet: {name: "推荐歌单", list: [], active: false, isFetching: false,},
    songList: {name: "最新音乐", list: [], active: false, isFetching: false,},
    djprogramList: {name: "主播电台", list: [], active: false, isFetching: false,},
    playList:{name: "歌曲列表", list: [], show: false, isFetching: false,},
    recmendList:{show: false, list:[]},
    placeConf:{
      personal: {name: "私人FM", show: false},
      recmend: {name: "每日推荐", show: false},
      songList: {name: "歌单", show: false},
      rankingList: {name: "排行榜", show: false},
    }
  });
  const curFn = cmusichomeFns[action.type];
  return curFn && curFn(state, action) || state;
};
export default cmusichome;
