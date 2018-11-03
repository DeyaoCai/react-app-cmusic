import React, { Component } from 'react';
import '../styles/Home.css';
import http from "../http/http.js";
import ListItemPic from "../components/units/ListItemPic.js";
import SongList from "../components/units/SongList.js";

class Home extends Component {
  constructor(){
    super();
    this.state = {
      songSheet: {name: "推荐歌单",list:[]},
      songList: {name: "最新音乐",list:[]},
      djprogramList: {name: "主播电台",list:[]},
      playList:{name: "歌曲列表",list:[]},
    };
    http.personalized()(res => {this.setState({
      songSheet: {name: "推荐歌单",
        list: res.result.map(item =>{
          return {
            name: item.name, img: item.picUrl, id: item.id,
            handelClick: (item)=>{
              http.playlistDetail({id: item.id})(res=>{
                this.setState({
                  playListShow: true,
                  playList: {name: "歌曲列表",list: res.playlist.tracks},
                });
              })
            }
          }
        })
      }
    });});

    http.personalizedNewsong()(res => {this.setState({
      songList: {name: "最新音乐",
        list: res.result.map(item=>{
          return {name: item.name, img: item.song.album.picUrl, id: item.id,}
        })
      }
    });});

    http.personalizedDjprogram()(res => {this.setState({
      djprogramList: {name: "主播电台",
        list: res.result.map(item=>{return {name: item.name, img: item.picUrl, id: item.id,}})
      }
    });});


  };
  render() {
    return (
      <div className="Home">
        <ListItemPic config={this.state.songSheet}/>
        <ListItemPic config={this.state.songList}/>
        <ListItemPic config={this.state.djprogramList}/>
        <SongList config={this.state.playList}/>
      </div>
    );
  }
}
export default Home;
