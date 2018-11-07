import React, { Component } from 'react';
import "./PopUp.css";
export default function(props){
  const config = props.config;
  const {content,show} = config;
  return (<div className={"vuc-popup" + (show ? " active" : "")}>
    <div>
      <div className="vuc-popup-up"/>
      <div className="vuc-popup-content">{content}</div>
      <div className="vuc-popup-down"/>
    </div>
  </div>)
}
