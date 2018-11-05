import React, { Component } from 'react';
function SongList(props) {
  const {config, toggleState, playASong} = props;
  return (
    <div className={"song-block" + (config.show ? " active" : "")}>
      <div className="song-title"><span>{config.name}</span><i onClick={toggleState}>{config.active ? "展开" : "收起"}</i></div>
      <ul className="song-list">{
        config.list.map((item, index)=> <li onClick={()=>{playASong(item.id)}} key={index}>
          {item.name}
        </li>)
      }</ul>
    </div>
  );
}
export default SongList;
