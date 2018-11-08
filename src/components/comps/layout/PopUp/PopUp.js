import React from 'react';
import "./PopUp.css";
import tools from "../../../tools.js";
export default function(props){
  const {config,content,func} = props;
  const {setConf} = func;
  const fromTop = func.derction === "top";
  const isFull = func.full;
  const wrapClass = tools.getClass("vuc-popup",{
    active: config.active,
    show: config.show,
    top: fromTop,
    full: isFull,
    flex: func.flex,
  });
  const downClass = tools.getClass("vuc-popup-down", {none: isFull || !fromTop});
  const upClass = tools.getClass("vuc-popup-up", {none: isFull || fromTop});
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
