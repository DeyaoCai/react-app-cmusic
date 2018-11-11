import React from 'react';
import $http from "./../../http/http.js";

import './Home.css';
import units from "../../components/units.js";
import comps from "../../components/comps.js";
import tools from "../../components/tools.js";
import Discover from "../Discover/Discover.js";

const {copy, scrollConf} = tools;
const {
  RecmendActs, List, SheetCatlist, RankList,
} = units;
const {
  Wrap,Search,FootNav, Tab, Place, Scroll
} = comps;

// 播放歌曲
function playASong(id,ev){
  $http.songUrl({id})(res=>{
    const audio = document.querySelector("#audio");
    audio.src = res.data[0].url;
    // audio.play();
  })
};

export default (conf) => {

  const NeedHideOtherPop = false;

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
  // 歌单详情
  function getSheetDetail(id){
    $http.playlistDetail({id})(res=>{
      showSongList(res.playlist);
    })
  }
  function getPlaylistCatlist(){
    $http.playlistCatlist()(res=>{
      const arr = Object.keys(res.categories).map(item=>({code: item, name: res.categories[item], list: []}));
      res.sub.forEach(item => arr[item.category].list.push(item));
      arr.forEach(item=>item.list.splice(4,0,{}));
      showSheetCatList(arr);
    })
  }
  function getTopPlaylist(id){
    $http.topPlaylist({limit:20,order: "new",cat: id})(res=>{
      showSheetList(res.playlists);
    })
  }

  function showSongList(list) {
    $actions.setSongList({show:true, list: list});
    setTimeout(() => $actions.setSongList({active:true}),50);
    if (NeedHideOtherPop){
      setTimeout(() => $actions.setSheetList({active:false}), 800);
      setTimeout(() => $actions.setSheetCatList({active:false}), 800);
      setTimeout(() => $actions.setRankList({active:false}), 800);
    }
  }

  function showSheetList(list) {
    $actions.setSheetList({show:true, list: list});
    setTimeout(() => $actions.setSheetList({active:true}), 50);
    if (NeedHideOtherPop) setTimeout(() => $actions.setSheetCatList({active:false}), 800);
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
  function getTopList(idx) {$http.topList({idx})(res => showSongList(res.playlist.tracks))}

  const {
    $actions,
    songList, sheetList, djprogramList, actionsList, sheetCatList, rankList,navTabIndex
  } = conf;

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


  const discoverConf={
    getRecommendSongs,getRecommendResource,getPersonalizedNewsong,getPersonalized,getPlaylistCatlist,getToplistDetail
  };
  const navConf= {
    index: navTabIndex,
      list: [{name: "发现",}, {name: "视频",}, {name: "我的",}, {name: "朋友",}, {name: "账号",}],
  }

  const setConfAct = $actions.setActionsList;
  const config = {
    // head: (),
    content: (
      <Scroll key={0} config={copy(scrollConf,{
        derction: "x",
        index: navTabIndex,
        itemNum:{x:5,y:1},
        takeOneStepAtATime: true,
        onRightEnd: () => console.log("right"),
        onLeftEnd: () => console.log("left"),
      })}>
        <Discover config={discoverConf}/>
      </Scroll>
    ),
    pop: (<div>
      <SheetCatlist  key={11} title={"每日推荐"} $actions={$actions}
       setConf={$actions.setSheetCatList}
       getSheet={getTopPlaylist}
       config={sheetCatList}/>
      <RankList  key={12} title={"每日推荐"} $actions={$actions}
         setConf={$actions.setRankList} playASong={getSheetDetail} showDetail={getTopList}
         config={rankList}/>
      <List key={1} title={"推荐歌单"}  type={"sheetList"} $actions={$actions} playASong={getSheetDetail}
        setConf={$actions.setSheetList}
        setConfAct={setConfAct}
            config={sheetList}/>
      <List key={2} title={"每日推荐"} $actions={$actions} playASong={playASong}
        type={"songList"}
        setConf={$actions.setSongList}
        setConfAct={setConfAct}
        config={songList}/>
      <RecmendActs key={13} config={actionsList} $actions={$actions}/>
    </div>),
    foot:(
      <FootNav config={navConf}/>
    )
  };
  return (<Wrap config={config}></Wrap>);
};



