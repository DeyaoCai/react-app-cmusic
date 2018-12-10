import React from 'react';
import "./Header.css";
export  default  function(props){
  const {left, title, right} = props.config;
  return <div className="vuc-header">
    <div>{title}</div>
    <div>{left}</div>
    <div>{right}</div>
  </div>
}
