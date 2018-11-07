import React from 'react';

import './Home.css';
import units from "../../components/units.js";
import comps from "../../components/comps.js";
const {
  ListItemPic, SongList, RecmendList,
} = units;
const {
  Wrap,Search,FootNav, PopUp,Tab,Place
} = comps;

export default (conf) => {
  const {
    songSheet,songList,djprogramList,playList,
    getPlayList, playASong,placeConf,
    toggleSongSheetState,toggleSongListtState, toggleDjprogramList, togglePlayList,
    togglePlaceConfRecmend,
  } = conf;
  const homeTab = {
    funcList: [
      {tabConf: placeConf.personal, onClick: () => console.log("私人FM")},
      {tabConf: placeConf.recmend, onClick: () => {
          togglePlaceConfRecmend(true);
      }},
      {tabConf: placeConf.songList, onClick: () => console.log("歌单")},
      {tabConf: placeConf.rankingList, onClick: () => console.log("排行榜")},
    ]
  }
  const config = {
    head: [
      <Search key={0}></Search>,
      <Tab key={1}></Tab>
    ],
    content: (
      <div>
        <Place config={homeTab}/>
        <ListItemPic config={songSheet} toggleState={toggleSongSheetState} getList={getPlayList}/>
        <ListItemPic config={songList} toggleState={toggleSongListtState} />
        <ListItemPic config={djprogramList} toggleState={toggleDjprogramList} />
      </div>
    ),
    pop: [
      <SongList key={0} config={playList} toggleState={togglePlayList} playASong={playASong}/>,
      <RecmendList key={1}></RecmendList>
    ],
    foot: [
      <FootNav key={0}></FootNav>
    ]
  }
  return (<Wrap config={config}></Wrap>);
};



