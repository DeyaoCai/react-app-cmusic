const read = require("./read.js");

const toolsConf = {
  inputPath: "./src/tools",
  outputPath: "./src/tools.js",
  fileReg: /\.js$/,
  importReg: /\/src/,
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

// read.writeExportFile(toolsConf);
read.writeExportFile(viewConf);
read.writeExportFile(unitConf);
read.writeExportFile(compConf);
