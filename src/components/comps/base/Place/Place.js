
import React, { Component } from 'react';
import "./Place.css";
export default function(props){
  const {config} = props;
  const {funcList} = config;
  return (<div className="vuc-place">
    {funcList.map((item, index) => (<span key={index}>{item.tabConf.name}</span>))}
  </div>)
}
