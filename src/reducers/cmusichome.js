import tools from "../components/tools.js";

const {copy} = tools;
const fns = {
  // 歌单
  updateSongSheet(state, action) {
    return copy(state, {songSheet: {list: action.data,}});
  },
  toggleSongSheetState(state, action){
    return copy(state, {songSheet: {active: !state.songSheet.active,}});
  },
  fetchSongSheet(state,action){
    return copy(state, {songSheet: {isFetching: action.data,}});
  },
  // 最新音乐
  updateSongList(state, action) {
    return copy(state, {songList: {list: action.data,}});
  },
  toggleSongListtState(state, action){
    return copy(state, {songList: {active: !state.songList.active,}});
  },
  fetchSongList(state, action) {
    return copy(state, {songList: {isFetching: action.data,}});
  },
  // 主播电台
  updateDjprogramList(state, action) {
    return copy(state, {djprogramList: {list: action.data,}});
  },
  toggleDjprogramList(state, action){
    return copy(state, {djprogramList: {active: !state.djprogramList.active,}});
  },
  fetchDjprogramList(state, action) {
    return copy(state, {djprogramList: {isFetching: action.data,}});
  },
  // 播放列表
  updatePlayList(state, action) {
    return copy(state, {playList: {list: action.data,}});
  },
  togglePlayList(state, action){
    return copy(state, {playList: {show: action.data,}});
  },
  fetchPlayList(state, action) {
    return copy(state, {playList: {isFetching: action.data,}});
  },
  togglePlaceConfRecmend(state, action){
    return copy(state, {playList: {show: action.data,}});
  },


};

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
  const curFn = fns[action.type];
  return curFn && curFn(state, action) || state;
}

export default cmusichome;
