import React, { Component } from 'react';
import "./PopUp.css";
import tools from "../../../tools.js";
export default function(props){
  const {config,content} = props;
  const {show,active} = config;

  const wrapClass = tools.getClass("vuc-popup",{
    "active": show,
    show: active,
  });
  return (
    <div className={wrapClass}>
      <div>
        <div className="vuc-popup-up"/>
        <div className="vuc-popup-content">{content}</div>
        <div className="vuc-popup-down"/>
      </div>
    </div>
  );
}
