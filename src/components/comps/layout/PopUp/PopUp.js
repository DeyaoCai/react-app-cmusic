import React from 'react';
import "./PopUp.css";
import ctools from "ctools";
const {getClass} = ctools;

export default function(props){
  const {config,content,func} = props;
  const {setConf} = func;
  const derction = func.derction;
  const isFull = func.full;
  const wrapClass = getClass("vuc-popup", derction,{
    active: config.active,
    show: config.show,
    full: isFull,
    flex: func.flex,
  });
  const downClass = getClass("vuc-popup-down", {none: isFull || !derction});
  const upClass = getClass("vuc-popup-up", {none: isFull || derction});
  function hidePop(e){
    if(func.stop) return;
    setConf({active: false});
  }; // 组件使用
  function animatinEnd(){setConf({show: config.active});}

  return (
    <div className={wrapClass}>
      <div onTransitionEnd={animatinEnd}  onClick={hidePop}>
        <div className={upClass}/>
        <div className="vuc-popup-content">{content}</div>
        <div className={downClass}/>
      </div>
    </div>
  );
}
