// 所有在 reducer 中使用的分支函数；
import cmusichomeFns from "../reducers/cmusichomeFn";
// ...这里可以继续引入其他模块的分值函数

// 根据reducer 分支函数名， 创建对应的 action 函数
// 这些action函数会接受一个值， 然后生成 返回{type: action名, data: 参数值}的方法；
function  makeReducerFnsIntoActions(reducerFns){
  const actions = {};
  Object.keys(reducerFns).forEach(item => actions[item] = (data) => {return {type: item, data}});
  return actions;
};

// 组合所有actions 作为 makeActions 内部需要转化的actions
const actions = {
  ...makeReducerFnsIntoActions(cmusichomeFns),
  // ...这里可以继续添加 分支函数
};

export {
  cmusichomeFns,
  // 这里可以继续暴露值，这里的值是reducer分支函数 给 reducer 使用的；
};

// 导出将 dispatch(action(val)) 转化为 xxx.action(val) 模式的函数；可以在外界用 ...xxx 结构成 action(val); 接受 dispatch 作为参数;
// 然后在 mapDispatchToProps 方法中 return { ...makeActions(dispatch), ... } 就可以在 子组件中使用action(val) 真是极方便的；
export default function makeActions(dispatch){
  function _(str,val){dispatch(actions[str](val));};
  const actionFn = {};
  Object.keys(actions).forEach(item=> actionFn[item] = val => _(item,val));
  return actionFn;
}
