import React, { Component } from 'react';
import http from "../../http/http.js";
class SongList extends Component {
  constructor(props){
    super(props);
    this.state = {isActive: true,};
    this.clickHandel = () => {
      this.setState({isActive: !this.state.isActive,});
    };
    this.handeSongClick = item => {
      http.songUrl({id: item.id})(res=>{
        const audio = document.querySelector("#audio");
        audio.src = res.data[0].url;
        audio.play();
      })


    }
  };
  render() {
    return (
      <div className={"song-block"}>
        <div className="song-title"><span>{this.props.config.name}</span><i onClick={this.clickHandel}>{this.state.isActive ? "展开" : "收起"}</i></div>
        <ul className="song-list">{
          this.props.config.list.map((item, index)=> <li onClick={()=>{this.handeSongClick(item)}} key={index}>
            {item.name}
          </li>)
        }</ul>
      </div>
    );
  }
}
export default SongList;
