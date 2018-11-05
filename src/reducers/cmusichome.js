import http from "../http/http";

const fns = {
  // 歌单
  updateSongSheet(state, action) {
    const arr = Object.keys(state).map(item=> {
      const list = state[item];
      return item === "songSheet" ? {name: list.name, list: action.data, active: list.active, isFetching: list.isFetching,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    return ret;
  },
  toggleSongSheetState(state, action){
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "songSheet" ? {name: list.name, list: list.list, active: !list.active, isFetching: list.isFetching,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    console.log(ret.songSheet)
    return ret;
  },
  fetchSongSheet(state,action){
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "songSheet" ? {name: list.name, list: list.list, active: list.active, isFetching: action.data,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    return ret;
  },
  // 最新音乐
  updateSongList(state, action) {
    const arr = Object.keys(state).map(item=> {
      const list = state[item];
      return item === "songList" ? {name: list.name, list: action.data, active: list.active, isFetching: list.isFetching,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    return ret;
  },
  toggleSongListtState(state, action){
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "songList" ? {name: list.name, list: list.list, active: !list.active, isFetching: list.isFetching,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    console.log(ret.songSheet)
    return ret;
  },
  fetchSongList(state, action) {
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "songList" ? {name: list.name, list: list.list, active: list.active, isFetching: action.data,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    return ret;
  },
  // 主播电台
  updateDjprogramList(state, action) {
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "djprogramList" ? {name: list.name, list: action.data, active: list.active, isFetching: list.isFetching} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    return ret;
  },
  toggleDjprogramList(state, action){
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "djprogramList" ? {name: list.name, list: list.list, active: !list.active, isFetching: list.isFetching,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    console.log(ret.songSheet)
    return ret;
  },
  fetchDjprogramList(state, action) {
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "djprogramList" ? {name: list.name, list: list.list, active: list.active, isFetching: action.data,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index) => {ret[item] = arr[index];});
    return ret;
  },
  // 播放列表
  updatePlayList(state, action) {
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "playList" ? {name: list.name, list: action.data, show: list.show, isFetching: list.isFetching,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index)=> {ret[item] = arr[index];});
    return ret;
  },
  togglePlayList(state, action){
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "playList" ? {name: list.name, list: list.list, show: action.data, isFetching: list.isFetching,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index)=> {ret[item] = arr[index];});
    return ret;
  },
  fetchPlayList(state, action) {
    const arr =  Object.keys(state).map(item=> {
      const list = state[item];
      return item === "playList" ? {name: list.name, list: list.list, show: list.show, isFetching: action.data,} : list;
    });
    const ret = {}
    Object.keys(state).forEach((item,index)=> {ret[item] = arr[index];});
    return ret;
  },
};

const cmusichome = (state, action) => {
  state || (state= {
    songSheet: {name: "推荐歌单", list: [], active: false, isFetching: false,},
    songList: {name: "最新音乐", list: [], active: false, isFetching: false,},
    djprogramList: {name: "主播电台", list: [], active: false, isFetching: false,},
    playList:{name: "歌曲列表", list: [], show: false, isFetching: false,},
  });
  const curFn = fns[action.type];
  return curFn && curFn(state, action) || state;
}

export default cmusichome
