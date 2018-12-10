const toolConf = {
  inputPath: ["./src/components/tools",],
  outputPath: "./src/components/tools.js",
  fileReg: /\.(js)$/,
  importReg: /\/src\/components/,
  exportReg: "",
  succMsg: "write tools success!",
  exportMode: "es6",
}
const compConf = {
  inputPath: ["./src/components/comps",],
  outputPath: "./src/components/comps.js",
  fileReg: /\.(js)$/,
  importReg: /\/src\/components/,
  exportReg: "",
  succMsg: "write comps success!",
  exportMode: "es6",
}
const unitConf = {
  inputPath: ["./src/components/units",],
  outputPath: "./src/components/units.js",
  fileReg: /\.(js)$/,
  importReg: /\/src\/components/,
  exportReg: "",
  succMsg: "write units success!",
  exportMode: "es6",
}
const viewConf = {
  inputPath: "./src/views",
  outputPath: "./src/views.js",
  fileReg: /\.js/,
  importReg: /\/src\/views/,
  exportReg: ".",
  succMsg: "write views success!",
  exportMode: "vueView",
  bizType: "train",
}
const reactConf = {
    readType: "single file",
    inputPath: ["./testOri",],
    outputPath: "./testSrc",
    fileReg: /\.(html)$/,
    succMsg: "write reactConf success!",
}
module.exports = [
  toolConf, compConf, unitConf, viewConf,
  // reactConf
];
