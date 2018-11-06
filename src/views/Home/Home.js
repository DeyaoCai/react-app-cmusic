import React, { Component } from 'react';
import { connect } from 'react-redux';

import $actions from '../../actions';
import $http from "../../http/http.js";

import './Home.css';
import units from "../../components/units.js";
const {ListItemPic, SongList} = units;

const Home = (conf) => {
  const {
    songSheet,songList,djprogramList,playList,
    getPlayList, playASong,
    toggleSongSheetState,toggleSongListtState, toggleDjprogramList, togglePlayList,
  } = conf;
  return (
    <div className="Home">
      <div><input type="text"/><div >播放界面</div></div>
      <ListItemPic config={songSheet} toggleState={toggleSongSheetState} getList={getPlayList}/>
      <ListItemPic config={songList} toggleState={toggleSongListtState} />
      <ListItemPic config={djprogramList} toggleState={toggleDjprogramList} />
      <SongList config={playList} toggleState={togglePlayList} playASong={playASong}/>
    </div>
  );
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


