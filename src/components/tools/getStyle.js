import type from "./type.js"

function _getStyle() {
  if(arguments.length) {
    const list = Array.prototype.map.call(arguments, item => item);
    const curObj = list.shift();
    // 支持传入字符串， 对象， 数组， 支持传入多个参数；
    if (type.isObject(curObj))
      _getStyle.apply(
        this,
        Object.keys(curObj).map(item=> `${item}: ${curObj[item]};`)
      );
    else if (type.isArray(curObj))
      return _getStyle.apply(this,curObj);
    else if (type.isFunction(curObj)) return this;
    else curObj && this.push(curObj);
    return _getStyle.apply(this,list);
  } else return this;
}
function getStyle(){
  return _getStyle.apply([],arguments).join("");
}
console.log(
  getStyle("color: #eee;",{"font-size": "20px"},["color: #eee;",{"font-size": "20px"}])
)
try{
  module.exports = getStyle;
} catch(e){}
export default getStyle;
