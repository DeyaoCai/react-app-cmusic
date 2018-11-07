const read = require("./read.js");

const toolConf = {
  inputPath: ["./src/components/tools",],
  outputPath: "./src/components/tools.js",
  fileReg: /\.(js)$/,
  importReg: /\/src\/components/,
  exportReg: "",
  succMsg: "write comp success!",
  exportMode: "es6",
}
const compConf = {
  inputPath: ["./src/components/comps",],
  outputPath: "./src/components/comps.js",
  fileReg: /\.(js)$/,
  importReg: /\/src\/components/,
  exportReg: "",
  succMsg: "write comp success!",
  exportMode: "es6",
}

const unitConf = {
  inputPath: ["./src/components/units",],
  outputPath: "./src/components/units.js",
  fileReg: /\.(js)$/,
  importReg: /\/src\/components/,
  exportReg: "",
  succMsg: "write comp success!",
  exportMode: "es6",
}

const viewConf = {
  inputPath: "./src/views",
  outputPath: "./src/views.js",
  fileReg: /\.js/,
  importReg: /\/src\/views/,
  exportReg: ".",
  succMsg: "write view success!",
  exportMode: "vueView",
  bizType: "train",
}

read.writeExportFile(toolConf);
read.writeExportFile(viewConf);
read.writeExportFile(unitConf);
read.writeExportFile(compConf);
