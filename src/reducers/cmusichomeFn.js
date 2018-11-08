import tools from "../components/tools.js";

const {copy} = tools;
export default {
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
    return copy(state, {placeConf: {recmend:{show: action.data,}}});
  },
  setPlaceConfRecmend(state, action){
    return copy(state, {placeConf: {recmend: action.data,}});
  },
  setPlaceConfRecmendAct(state, action){
    return copy(state, {placeConf: {recmend: {actionsConf: action.data},}});
  },
};
/*
设置一个弹窗的
  先激活， 激活的动画停止回调执行，
  然后 setTimeout 让动画动起来，
  然后动画结束 设置激活

show = true 用来展开页面；
active = false



*/
