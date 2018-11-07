// 这个是分支处理函数
import cmusichomeFn from "./cmusichomeFn.js";

// 这里是reducer // 生成并更新store 的入口函数
const cmusichome = (state, action) => {
  // 初始化时， 没有state 所以可以在这里设置 初始值
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
  const curFn = cmusichomeFn[action.type]; // 根据action 查找分支函数
  return curFn && curFn(state, action) || state; // 没找到处理函数 则返回上一次的 state
};
export default cmusichome;
