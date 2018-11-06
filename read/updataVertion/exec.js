const {getType} = require("../read.js");
const log = require("../log.js");
const cProcess = require('child_process');
function myExec(conf){
  const exec = conf && (getType.isFunction(conf.exec) ? conf.exec() : conf.exec);
  if(!exec) {
    exec.stdinEnd && exec.stdinEnd();
    process.stdin.end();
    return;
  }
  log("start!").use("bt")(exec).use("t").end();
  cProcess.exec(exec,function(err,stdout,stderr){
    const next = conf.next && conf.next();
    const resove = conf.resove;
    if (err) {
      log("failed!").use("be")(exec).use("e").end();
      conf.reject && conf.reject(err);
      throw err;
    } else {
      log("succeed!").use("bs")(exec).use("s").end();
      resove && resove(stdout, conf) || next && myExec(next);
    }
  });
};
module.exports = myExec;
