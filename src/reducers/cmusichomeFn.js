import ctools from "ctools";
const {copy} = ctools;
export default {
  // 歌单
  setSheetList(state, action) {
    return copy(state, {sheetList: action.data});
  },
  // 最新音乐
  setSongList(state, action) {
    return copy(state, {songList: action.data});
  },
  // 主播电台
  setDjprogramList(state, action) {
    return copy(state, {djprogramList: {list: action.data,}});
  },
  setActionsList(state, action){
    return copy(state, {actionsList: action.data});
  },
  setSheetCatList(state, action){
    return copy(state, {sheetCatList: action.data});
  },
  setRankList(state, action){
    return copy(state, {rankList: action.data});
  },
  setNavTabIndex(state, action){
    return copy(state, {
      navTabIndex: action.data,
      navIndex: {index: action.data}
    });
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
