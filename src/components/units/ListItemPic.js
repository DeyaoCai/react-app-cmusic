import React, { Component } from 'react';
function ListItemPic(props) {
  const {config,getList,toggleState} = props;
  return (
    <div className={"home-block" + (config.active ? "" : " fold")}>
      <div className="home-title"><span>{config.name}</span><i onClick={toggleState}>{config.active ? "收起" : "展开"}</i></div>
      <ul className="home-list">{
        config.list.map((item, index)=> <li onClick={()=>{getList && getList(item.id)}} className="home-list-item" key={index}>
          <img src={item.img}></img>
          {item.name}
        </li>)
      }</ul>
    </div>
  );
}
export default ListItemPic;
