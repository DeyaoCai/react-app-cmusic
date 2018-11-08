import React from 'react';
import comps from "../../../comps.js";
const {PopUp} = comps;
export default function (props) {
  const {config} = props
  const constent = (<div>213</div>);
  return (<PopUp config={config} content={constent}></PopUp>)
}
