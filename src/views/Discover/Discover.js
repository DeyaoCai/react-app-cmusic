import React from "react";

import units from "../../components/units.js";
import comps from "../../components/comps.js";
import ctools from "ctools";
// import {scrollConf} from "../../components/tools.js";
import tools from "../../components/tools.js";
import $http from "../../http/http";
const  scrollConf= tools.scrollConf;
const {copy} = ctools;
const {
  RecmendActs, List, SheetCatlist, RankList
} = units;
const {
  Wrap,Search,FootNav, Tab, Place, Scroll
} = comps;
// 播放歌曲

export  default function Discover(props) {
  const {config,onLeftEnd,onRightEnd,$actions} = props;
  const {
    discoverTabIndex,showSongList,showSheetList,
  } = config;
  discoverTabIndex.onLeftEnd = onLeftEnd;
  discoverTabIndex.onRightEnd = onRightEnd;

  // 每日推荐 // 歌曲 // 歌单
  function getRecommendSongs() {
    $http.recommendSongs()(res=>{
      showSongList(res.recommend);
    });
  }
  function getRecommendResource() {
    $http.recommendResource()(res=>{
      $actions.setSheetList({show:true, list: res.recommend});
      setTimeout(() => $actions.setSheetList({active:true}), 50);
    });
  }
  // 私人
  function getPersonalizedNewsong(){
    $http.personalizedNewsong()(res=>{
      showSongList(res.result);
    });
  }
  function getPersonalized() {
    $http.personalized()(res=>{
      showSheetList(res.result);
    });
  }
  function getPlaylistCatlist(){
    $http.playlistCatlist()(res=>{
      const arr = Object.keys(res.categories).map(item=>({code: item, name: res.categories[item], list: []}));
      res.sub.forEach(item => arr[item.category].list.push(item));
      arr.forEach(item=>item.list.splice(4,0,{}));
      showSheetCatList(arr);
    })
  }

  function showSheetCatList(list) {
    $actions.setSheetCatList({list: list, show:true});
    setTimeout(() => $actions.setSheetCatList({active:true}),50);
  }
  function showRankList(list){
    $actions.setRankList({show:true, list: list});
    setTimeout(() => $actions.setRankList({active:true}), 50);
  }
  function getToplistDetail(){$http.toplistDetail()(showRankList)}
  const songPlace = {
    funcList: [
      {tabConf: {name: "歌曲", icon: "456"}, onClick: getRecommendSongs},
      {tabConf: {name: "歌单", icon: "456"}, onClick: getRecommendResource},
      {tabConf: {name: "每日推荐", icon: "456"}, onClick: () => console.log("私人FM")},
    ]
  };
  const sheetPlace = {
    funcList: [
      {tabConf: {name: "歌曲", icon: "456"}, onClick: getPersonalizedNewsong},
      {tabConf: {name: "歌单", icon: "456"}, onClick: getPersonalized},
      {tabConf: {name: "私人", icon: "456"}, onClick: getPlaylistCatlist},
    ]
  };
  const rankPlace = {
    funcList: [
      {tabConf: {name: "排行榜", icon: "456"}, onClick: getToplistDetail},
    ]
  };


  const navConf= {
    index: discoverTabIndex.index,
    list: [{name: "个性推荐",}, {name: "主播电台",}],
  };
  discoverTabIndex.upDateIndexOnEnd = ()=>{
    $actions.setDiscoverTabIndex(discoverTabIndex.index);
  };
  function setDiscoverTabIndex(index){
    discoverTabIndex.setIndex({x: index, y:0});
    $actions.setDiscoverTabIndex({x: index, y:0});
  }
  function onSelfLeftEnd(){
    const index = discoverTabIndex.index.x--;
    setDiscoverTabIndex(index<0 ? 0 : index);
  }
  function onSelfRightEnd(){
    const num = discoverTabIndex.itemNum.x;
    const index = discoverTabIndex.index.x + 1;
    setDiscoverTabIndex(index>=num ? num - 1 : index);
  }

  return (<Wrap config={{
    head: [<Search key={0}/>, <Tab key={1} config={navConf} setIndex={setDiscoverTabIndex}/>],
    content:(<Scroll key={0} config={discoverTabIndex}>
      <div className="vuc-discover">
        <Scroll config={copy(scrollConf,{derction: "y"})}>
          <Place config={songPlace}/>
          <Place config={sheetPlace}/>
          <Place config={rankPlace}/>
        </Scroll>
        <Scroll config={copy(scrollConf,{derction: "y"})}>
          <Place config={songPlace}/>
          <Place config={rankPlace}/>
          <Place config={sheetPlace}/>
        </Scroll>
      </div>
    </Scroll>)
  }}/>)
}
