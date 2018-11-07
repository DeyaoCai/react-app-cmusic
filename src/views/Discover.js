import makeActions from '../actions';
import $http from "./../http/http.js";import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from "./Home/Home.js";

const mapStateToProps = state => {
  return {...state.cmusichome}
};

const mapDispatchToProps = dispatch => {
  const $actions = makeActions(dispatch);
  $http.personalized()(res => {
    $actions.updateSongSheet(
      res.result.map(item => ({
        name: item.name, img: item.picUrl, id: item.id,
      }))
    )
  });
  $http.personalizedNewsong()(res => {
    $actions.updateSongList(
      res.result.map(item=>{
        return {name: item.name, img: item.song.album.picUrl, id: item.id,}
      })
    )
  });
  $http.personalizedDjprogram()(res => {
    $actions.updateDjprogramList(res.result.map(item=>{return {name: item.name, img: item.picUrl, id: item.id,}}));
  });
  return{
    ...$actions,
    getPlayList: function (id) {
      $actions.fetchPlayList(true);
      $http.playlistDetail({id})(res=>{
        $actions.updatePlayList(res.playlist.tracks);
        $actions.togglePlayList(true);
        $actions.fetchPlayList(true);
      });
    },
    playASong(id){
      $http.songUrl({id})(res=>{
        const audio = document.querySelector("#audio");
        audio.src = res.data[0].url;
        audio.play();
      })
    },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
