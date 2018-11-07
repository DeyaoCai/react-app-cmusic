import React from 'react';
import comps from "../../../comps.js";
const {PopUp} = comps;
console.log(comps)
export default function () {
  const config = {
    constent: (<div></div>),
    show: false,

  };
  return (<PopUp config={config}></PopUp>)
}
