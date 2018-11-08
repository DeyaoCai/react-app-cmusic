import type from "./type.js"

function _getClass() {
  if(arguments.length) {
    const list = Array.prototype.map.call(arguments, item => item);
    const curObj = list.shift();
    // 支持传入字符串， 对象， 数组， 支持传入多个参数；
    if (type.isObject(curObj))
      _getClass.apply(
        this,
        Object.keys(curObj).filter(item=>curObj[item])
      );
    else if (type.isArray(curObj))
      return _getClass.apply(this,curObj);
    else if (type.isFunction(curObj)) return this;
    else curObj && this.push(curObj);
    return _getClass.apply(this,list);
  } else return this;
}
function getClass(){
  return _getClass.apply([],arguments).join(" ");
}
console.log(
getClass("46",{a:1,b:2},[3,4,{c:5,d:0}])
)
try{
  module.exports = getClass;
} catch(e){}
export default getClass;
