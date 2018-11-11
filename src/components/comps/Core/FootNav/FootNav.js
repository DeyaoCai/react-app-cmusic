import React from 'react';
import "./FootNav.css";
import tools from "../../../tools.js";
const {getClass} = tools;
export default function(props){
  const {config,setIndex} = props;
  const { list, index,} = config;
  return (<div className="vuc-foot-nav">{
    list.map((item,i) => (<span key={i} className={getClass({active: index.x === i})} onClick={()=>setIndex(i)}>{item.name}</span>))
  }</div>)
}
