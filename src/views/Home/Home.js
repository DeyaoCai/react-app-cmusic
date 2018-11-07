import React from 'react';

import './Home.css';
import units from "../../components/units.js";
import comps from "../../components/comps.js";
const {ListItemPic, SongList, } = units;
const {Wrap,Search,FootNav, PopUp,Tab,Place} = comps;

export default (conf) => {
  const {
    songSheet,songList,djprogramList,playList,
    getPlayList, playASong,
    toggleSongSheetState,toggleSongListtState, toggleDjprogramList, togglePlayList,
  } = conf;
  const config = {
    head: [
      <Search key={0}></Search>,
      <Tab key={1}></Tab>
    ],
    content: (
      <div>
        <Place config={[
          {name: "私人FM", onClick: () => console.log("私人FM")},
          {name: "每日推荐", onClick: () => console.log("每日推荐")},
          {name: "歌单", onClick: () => console.log("歌单")},
          {name: "排行榜", onClick: () => console.log("排行榜")},
          ]}/>
        <ListItemPic config={songSheet} toggleState={toggleSongSheetState} getList={getPlayList}/>
        <ListItemPic config={songList} toggleState={toggleSongListtState} />
        <ListItemPic config={djprogramList} toggleState={toggleDjprogramList} />
      </div>
    ),
    pop: [
      <SongList key={0} config={playList} toggleState={togglePlayList} playASong={playASong}/>,
      <PopUp key={1} config={{content:(<div style={{height: "100%"}}>popup</div>),show: false}}></PopUp>
    ],
    foot: [
      <FootNav key={0}></FootNav>
    ]
  }
  return (<Wrap config={config}></Wrap>);
};



