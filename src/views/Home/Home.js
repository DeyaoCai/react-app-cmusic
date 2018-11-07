import React, { Component } from 'react';
import { connect } from 'react-redux';

import $actions from '../../actions';
import $http from "../../http/http.js";

import './Home.css';
import units from "../../components/units.js";
import comps from "../../components/comps.js";
const {ListItemPic, SongList, } = units;
const {Wrap,Search,FootNav, PopUp,Tab,Place} = comps;

const Home = (conf) => {
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
      <div><Place></Place>
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

const mapStateToProps = state => {
  return {...state.cmusichome}
};

const mapDispatchToProps = dispatch => {
  $http.personalized()(res => {
    dispatch($actions.updateSongSheet(
      res.result.map(item => ({
        name: item.name, img: item.picUrl, id: item.id,
      }))
    ))
  });
  $http.personalizedNewsong()(res => {
    dispatch($actions.updateSongList(
      res.result.map(item=>{
        return {name: item.name, img: item.song.album.picUrl, id: item.id,}
      })
    ))
  });
  $http.personalizedDjprogram()(res => {
    dispatch($actions.updateDjprogramList(res.result.map(item=>{return {name: item.name, img: item.picUrl, id: item.id,}})));
  });
  return{
    getPlayList: function (id) {
      dispatch($actions.fetchPlayList(true));
      $http.playlistDetail({id})(res=>{
        dispatch($actions.updatePlayList(res.playlist.tracks));
        dispatch($actions.togglePlayList(true));
        dispatch($actions.fetchPlayList(true));
      });
    },
    toggleSongSheetState(){dispatch($actions.toggleSongSheetState(false));},
    toggleSongListtState(){dispatch($actions.toggleSongListtState(false));},
    toggleDjprogramList(){dispatch($actions.toggleDjprogramList(false));},
    togglePlayList(){dispatch($actions.togglePlayList(false));},
    closePlayPage(){dispatch($actions.togglePlayList(false));},
    playASong(id){
      $http.songUrl({id})(res=>{
        const audio = document.querySelector("#audio");
        audio.src = res.data[0].url;
        audio.play();
      })
    },
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);


