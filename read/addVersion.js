const fs = require("fs");
const log = require("./log.js");
const exec = require("./updataVertion/exec.js");
const lightBranch = require("./updataVertion/lightBranch.js");
const devBranch = require("./updataVertion/devBranch.js");

const pathes = fs.readdirSync("../");
const cwd = process.cwd().split(/[\\\/]/).pop();
const oriBizType = cwd.match(/(app|wxm)-[a-zA-Z0-9]+/); // (app|wxm)-xxx
let bizType = oriBizType && oriBizType[0]; // 业务类型
if (cwd === "desktopapp")  bizType =cwd;
let stdinType = null;

const confs ={
  appPath: pathes.find(item=> item.match(/app-common/)),
  bizVersion: null,
  branch: null,
  pushType: null,
  isLightBranch: null,
  isDevBranch: null,
  pushToDevBrance: process.argv.includes("--todev"),
  stdinEnd(){process.stdin.end();}
}

// 判断项目目录；// 修正
// 判断业务类型；
// 判断所在分支；// 是否需要
// 获取推送类型：// 输入

const availableBiz = [
  "app-train","app-flight","app-common","app-expense","app-hotel","app-car",
  "pc-common","pc-expense",
  "wxm-app","wxm-pc","app-wxm","pc-wxm",
];

function getBizDir(){
  if(bizType){
    getBizType();
  } else {
    log("err!").use("be")("未知项目目录").use("e").end();
    stdinType = "getBizDir";
    log
      .bt("可用的业务类型如下:").end()
      .t(availableBiz.map((item,index)=>index+"."+item).join("\n")).end()
      .t("请输入校正后的业务类型编号")("输入任意不符合的值退出").end();
  }
}
function getBizType(){
  if (availableBiz.includes(bizType) || cwd === "desktopapp") {
    log("提示!").use("bt")("已知业务类型： " + bizType).use("t").end();
    exec({
      exec: "git branch",
      resove: judgeBranch,
    });
  } else {
    log("err!").use("be")("未知业务类型").use("e").end();
  }
}

function judgeBranch(stdout) {
  const branches = stdout.replace(/ /g,"").split(/\n/);
  const nowBranch = branches.find(item=>/\*/.test(item));
  confs.branch = nowBranch && nowBranch.slice(1);
  log.t(`now branch is ${confs.branch}!`).end();
  confs.isLightBranch = /^ISSUES-/.test(confs.branch);
  confs.isDevBranch = /^(dev|test|uat|master)$/.test(confs.branch);
  if (confs.isLightBranch) {
    lightBranch(confs);
    return true;
  }
  if (confs.isDevBranch) {
    devBranch(confs);
  }
};




process.stdin.setEncoding('utf8');
//process.stdin.on('data', data => stdInFn[stdinType] && stdInFn[stdinType](data));

const stdInFn = {
  getBizDir: data => {
    const index = Number(data);
    if (availableBiz[index]){
      bizType = availableBiz[index];
      stdinType = null;
      getBizType();
    } else {
      log("err!").use("be")("未知业务类型").use("e").end();
      process.stdin.end();
    }
  },
};
// 入口；
getBizDir();
