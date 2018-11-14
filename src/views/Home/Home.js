import React from 'react';
import $http from "./../../http/http.js";

import './Home.css';
import units from "../../components/units.js";
import comps from "../../components/comps.js";
import tools from "../../components/tools.js";
import Discover from "../Discover/Discover.js";

const {copy} = tools;
const {
  RecmendActs, List, SheetCatlist, RankList,Audio
} = units;
const {
  Wrap,FootNav,Scroll
} = comps;



export default (conf) => {

  const NeedHideOtherPop = false;
  // 歌单详情
  function getSheetDetail(id){
    $http.playlistDetail({id})(res=>{
      showSongList(res.playlist);
    })
  }
  function getTopPlaylist(id){
    $http.topPlaylist({limit:20,order: "new",cat: id})(res=>{
      showSheetList(res.playlists);
    })
  }
// 播放歌曲
  function playASong(songDto,ev){
    $http.songUrl({id: songDto.id || songDto})(res=>{
      const audio = document.querySelector("#audio");
      audio.src = res.data[0].url;
      showPlayPage(songDto);
      console.log(songDto)
    })
  };
  function showPlayPage(songDto) {
    $actions.setPlayconf({show:true, songDto: songDto});
    setTimeout(() => $actions.setPlayconf({active:true}),50);
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
  function getTopList(idx) {$http.topList({idx})(res => showSongList(res.playlist.tracks))}


  const {
    $actions,
    songList, sheetList, actionsList, sheetCatList, rankList,navTabIndex,discoverTabIndex,songSearch,playconf
  } = conf;

  const discoverConf={
    discoverTabIndex,showSongList,showSheetList,songSearch,onRightEnd, onLeftEnd,playASong,showPlayPage
  };
  const navConf= {
    index: navTabIndex.index,
    list: [{name: "发现",}, {name: "视频",}, {name: "我的",}, {name: "朋友",}, {name: "账号",}],
  };

  function setNavIndex(index){
    navTabIndex.setIndex({x: index, y:0});
    $actions.setNavTabIndex({x: index, y:0});
  }
  function onLeftEnd(){
    const index = navTabIndex.index.x--;
    setNavIndex(index<0 ? 0 : index);
  }
  function onRightEnd(){
    const num = navTabIndex.itemNum.x;
    const index = navTabIndex.index.x + 1;
    setNavIndex(index>=num ? num - 1 : index);
  }

  const setConfAct = $actions.setActionsList;
  const config = {
    // head: (),
    content: (
      <Scroll config={navTabIndex}>
        <div className="vuc-discover">
          <Discover key={0} config={discoverConf} onLeftEnd={onLeftEnd} onRightEnd={onRightEnd} $actions={$actions}/>
          <div key={1}>视屏</div>
          <div key={2}>我的</div>
          <div key={3}>朋友</div>
          <div key={4}>账号</div>
        </div>
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
      <Audio
        $actions={$actions}
        config={playconf}
        playASong={playASong}
        setConfAct={setConfAct}
        setConf={$actions.setSongList}
      />
    </div>),
    foot:(
      <FootNav config={navConf} setIndex={setNavIndex}/>
    )
  };
  return (<Wrap config={config}></Wrap>);
};



