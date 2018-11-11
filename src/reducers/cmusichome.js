// 这个是分支处理函数
import cmusichomeFn from "./cmusichomeFn.js";

// 这里是reducer // 生成并更新store 的入口函数
const cmusichome = (state, action) => {
  // 初始化时， 没有state 所以可以在这里设置 初始值
  state || (state= {
    sheetList: {name: "歌单", list: [], show: false,active: false},
    sheetCatList: {list: [], show: false,active: false},
    songList: {name: "歌曲", list: [], show: false,active: false},
    djprogramList: {name: "电台", list: [], show: false,active: false},
    actionsList: {name: "动作",show: false, active: false, songDto: null},
    rankList: {name: "动作",show: false, active: false, songDto: null},
    navTabIndex:{x: 0, y: 0},
  });
  const curFn = cmusichomeFn[action.type]; // 根据action 查找分支函数
  return curFn ? curFn(state, action) : state; // 没找到处理函数 则返回上一次的 state
};
export default cmusichome;


