import React from 'react';
import "./Wrap.css";
export  default  function(props){
  const config = props.config;
  const {head,content,foot,pop} = config;

  return (<div className="vuc-wrap"><div><div>
    <div className="vue-wrap-head">{head/*头部*/}</div>
    <div className="vue-wrap-content"><div>{content/*主体*/}</div></div>
    <div className="vue-wrap-foot">{foot/*脚部*/}</div>
    <div>{pop/*全屏弹窗*/}</div>
  </div></div></div>)
}
