const fs = require("fs");
const log = require("../log.js");
const exec = require("./exec.js");

// 拉代码 (当前分支|test分支)
// 添加到提交列表
// 提交
// 同步|推送
module.exports =  function (confs) {
  const {
    appPath,
    branch,
    pushType,
    isLightBranch,
    isDevBranch,
    pushToDevBrance,
  } = confs;
  exec.stdinEnd = confs.stdinEnd;

  const fns = {
    pullCurBranch: {
      exec: () =>"git pull origin " +  branch,
      next: ()=> fns.pullTest,
    },
    pullTest: {
      exec: () => "git pull origin test",
      next: ()=> fns.save,
    },
    save: {
      exec: "git add .",
      next: ()=> fns.commit,
    },
    commit: {
      exec: 'git commit -m "auto commit"',
      next: ()=> fns.push,
    },
    push: {
      exec: 'git push',
      resove: () => {
        if (pushToDevBrance) exec(fns.checkoutdev);
        else log("end").end();
      },
      next: ()=> fns.xxxx,
    },
    checkoutdev:{
      exec: 'git checkout dev',
      next: () => fns.pulldev,
    },
    pulldev:{
      exec: 'git pull origin dev',
      next: () => fns.pullnowbranch,
    },
    pullnowbranch:{
      exec: 'git pull origin ' + branch,
      next: () => fns.pushdevbranch,
    },
    pushdevbranch:{
      exec: 'git push ',
      next: () => fns.resumebranch,
    },
    resumebranch:{
      exec: 'git checkout ' + branch,
      next: () => fns.xxxx,
    },
    openUrl: {
      exec: "start http://192.168.1.239:8080/jenkins/view/dev/job/dev-tem-app-common/",
      next: ()=> fns.sssss,


    }
  };
  exec(fns.pullCurBranch);
};
