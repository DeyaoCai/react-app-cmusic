import type from "./type.js"

function _copy() {
  if(arguments.length) {
    const list = Array.prototype.map.call(arguments, item => item);
    const curObj = list.shift();
    Object.keys(curObj).forEach(item=>{
      const val = curObj[item];
      if(val !== undefined)
        this[item] = (type.isObject(val) && copy(this[item]||{},val)) ||
          (type.isArray(val) && val.map(item => item)) ||
          val;
    });
    return _copy.apply(this, list);
  } else return this;
}
function copy(){return _copy.apply({},arguments);}
try{
  module.exports = copy;
} catch(e){}
export default copy;
