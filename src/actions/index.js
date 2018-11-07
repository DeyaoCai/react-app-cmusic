import tools from "../components/tools.js";

const {copy} = tools;
const cmusichomeFns = {
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

const cmusichome = {};
Object.keys(cmusichomeFns).forEach(item => cmusichome[item] = (data) => {return {type: item, data}});

export {cmusichomeFns};
export default function makeActions(dispatch) {
  function _(str,val){dispatch(cmusichome[str](val));};
  const actionFn = {};
  Object.keys(cmusichome).forEach(item=> actionFn[item] = val => _(item,val));
  return actionFn;
}
