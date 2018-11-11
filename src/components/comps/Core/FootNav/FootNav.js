import React from 'react';
import "./FootNav.css";
import tools from "../../../tools.js";
const {getClass} = tools;
export default function(props){
  console.log(props)
  const {config} = props;
  console.log(config)
  const { list, index,} = config;
  return (<div className="vuc-foot-nav">{
    list.map((item,i) => (<span key={i} className={getClass({active: index.x === i})}>{item.name}</span>))
  }</div>)
}
