import React from 'react';
import "./Search.css";
import $http from "../../../../http/http.js";
let lastInputTime = 0;

export default function(props){
  const {config,$actions} = props;

  function onInput(ev){
    const text = ev.target.value;
    lastInputTime = new Date().getTime();
    setTimeout(()=>{
      if (new Date().getTime() - 300 >= lastInputTime){
        searchSongs(text)
      }
    },310)
  }
  function searchSongs(text) {
    $http.search({keywords: encodeURI(text)})(res =>{
      $actions.setSongSearch({list: res.result.songs});
    })
  }
  function onBlur(ev){ev.target.value || hidePop();}
  function hidePop() {$actions.setSongSearch({active: false});}
  function showSongSearch() {
    $actions.setSongSearch({show:true});
    setTimeout(() => $actions.setSongSearch({active:true}), 50);
  }
  return (<div className="vuc-search">
    <input onInput={onInput} onFocus={showSongSearch} onBlur={onBlur} type="text"/>
  </div>)
}
