const fs = require("fs");
const log = require("../log.js");
const exec = require("./exec.js");

function former(timeFormer, timeStamp){
  // 如果不想 创建自定义时间对象，也可以使用格式化方法
  const stamp = timeStamp || this.timeStamp;
  const week="日一二三四五六";
  function to00(num){return (num>9?"":"0")+num;};
  return timeFormer
    .replace("yea", stamp.getFullYear())
    .replace("mon", to00(stamp.getMonth() + 1))
    .replace("dat", to00(stamp.getDate()))
    .replace("hou", to00(stamp.getHours()))
    .replace("min", to00(stamp.getMinutes()))
    .replace("sec", to00(stamp.getSeconds()))
    .replace("day", week[stamp.getDay()])
}
/*
  读取pakege.json
  然后更新版本号， 其他啥也不干啥都不干了
*/
function updatePackgeJson(){
  log("start").use("bt")("update version!").use("t").end();
  let nowV = "";
  const str = fs.readFileSync('./package.json',"utf-8");
  const outPut = str .replace(
    /(\"version\": \")([^\.]+\.[^\.]+\.)([^"',;]+)/,
    function () {
      const ar = arguments;
      nowV = ar[1] + former("yea.mon.dat-hou-min-sec",new Date());
      bizVersion = nowV.match(`(?:"version": ")([^"']+)`)[1];

      log(`trying to set version ${nowV}`).use("t").end();
      return nowV;
    }
  )
  fs.writeFileSync('./package.json',outPut);
  log("succ!").use("bs")("set version!").use("s").end();
  log("latest version is " + nowV).use("t").end();
};
const fns = {
  // 发布
  publish: {
    exec: "npm publish",
    next: ()=> fns.xxx,
  },
}
// 入口；
module.exports =  function () {
  updatePackgeJson();
  exec(fns.publish)
};
