import React from "react";

import units from "../../components/units.js";
import comps from "../../components/comps.js";
import tools from "../../components/tools.js";
const {copy, scrollConf} = tools;
const {
  RecmendActs, List, SheetCatlist, RankList
} = units;
const {
  Wrap,Search,FootNav, Tab, Place, Scroll
} = comps;
// 播放歌曲

export  default function Discover(props) {
  const {
    getRecommendSongs,getRecommendResource,getPersonalizedNewsong,getPersonalized,getPlaylistCatlist,getToplistDetail,
  } = props.config;

  // songPlace
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

  return (<Wrap config={{
    head: [<Search key={0}/>, <Tab key={1}/>],
    content:(<Scroll key={0} config={copy(scrollConf,{
      derction: "xy",
      index: {x:0,y:0},
      itemNum:{x: 2,y: 1},
      takeOneStepAtATime: true,
    })}>
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
