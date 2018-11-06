const fs = require("fs");
const getType= item => {return Object.prototype.toString.call(item).slice(8,-1);}
getType.isNumber = item => getType(item) === "Number";
getType.isString = item => getType(item) === "String";
getType.isArray = item => getType(item) === "Array";
getType.isObject = item => getType(item) === "Object";
getType.isBoolean = item => getType(item) === "Boolean";
getType.isNull = item => getType(item) === "Null";
getType.isUndefined = item => getType(item) === "Undefined";
getType.isFunction = item =>getType(item) === "Function";
getType.isDate = item =>getType(item) === "Date";


function _reatdDir(path, reg, result) { // path 读取的目录， reg 文件匹配的正则， result 为结果集
  const pathes = fs.readdirSync(path);
  const fileReg = /\./;
  pathes.forEach(item => {
    if (fileReg.test(item)) { // 判断是否为文件
      if (reg.test(item)) {result.push({ // 判断是否为指定文件
        path: path + "/" + item, // 路径
        name: item.replace(reg, ""), // 文件名
      });}
    } else _reatdDir(path + "/" + item, reg, result); // 文件夹的话 就往下读取
  })
}

function reatdDrir(path, reg) { // path 读取的目录， reg 文件匹配的正则 返回一个 读取完的数组
  const result = [];
  _reatdDir(path, reg, result);
  return result;
}

function writeExportFile(conf){
  let inputPath = [];
  if (getType.isString(conf.inputPath)) inputPath = [conf.inputPath];
  else if (getType.isArray(conf.inputPath)) inputPath = conf.inputPath;
  else return;

  const result = Array.prototype.concat.apply([],inputPath.map(item => reatdDrir(item, conf.fileReg)));
  let importList,exportList;
  if (conf.exportMode === "node"){
    importList = result.map(item => `const ${item.name} = require("${item.path.replace(conf.importReg,conf.exportReg)}");`).join("\n");
    exportList = `\n\nmodule.exports = {${result.map(item => "\n\t" + item.name + "").join(",")}\n};`;
  }else if (conf.exportMode === "es6"){
    importList=result.map(item=>`import ${item.name} from "${item.path.replace(conf.importReg,conf.exportReg)}"`).join("\n");
    exportList=`\n\nexport default {\n\t${result.map(item=>conf.exportFn ? conf.exportFn(item) : item.name).join(",\n\t")}\n}`
  }else if(conf.exportMode === "vueView"){
    importList = `export default [\n\t`+result.map(item => `{path: '/${conf.bizType}/${item.name}',name: '${item.name}',component(resolve) {require(['${item.path.replace(conf.importReg,conf.exportReg)}'], resolve)}}`).join(",\n\t");
    exportList = "\n]";
  }
  fs.writeFileSync(conf.outputPath, importList + exportList);
  console.log(conf.succMsg);
}


module.exports = {
  reatdDrir,
  writeExportFile,
  getType,
}
