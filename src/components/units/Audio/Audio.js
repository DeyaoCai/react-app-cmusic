import React from 'react';
import comps from "../../comps.js";
import "./Audio.css"
import tools from "../../tools.js";
import ctools from "ctools";
const {copy} = ctools;
const { scrollConf} = tools;
const {PopUp,Icon,Scroll} = comps;
export default function (props) {
  const {config, $actions,playASong,setConfAct,title, type} = props;
  const {Wrap,Header,HeadNormal} = comps;
  const songDto = config.songDto || {};
  function togglePlay() {
    const audio = document.querySelector("#audio");
    audio.paused ? audio.play() : audio.pause();
  }
  function hidePop(e){$actions.setPlayconf({active: false});}
  const headerConf = {
    left: (<Icon icon={"back1"} handerclick={hidePop}/>),
    title: (<HeadNormal content={<div className="vuc-audio-title">{songDto.name}</div>}/>),
    right: (<Icon icon={"gengduo1"}/>),
  };
  const constent = (<Wrap stop={true} config={{
    head: (<Header config={headerConf}/>),
    content: (<Scroll config={copy(scrollConf,{derction: "y", itemNum:{x:1,y:1},})}>
      <div className="vuc-audio-cont">
        <b style={{
          backgroundImage: `url(${songDto && songDto.album && songDto.album.blurPicUrl})`
        }}/>
        <span onClick={togglePlay} className="vuc-audio-img" style={{
          backgroundImage: `url(${songDto && songDto.album && songDto.album.blurPicUrl})`
        }}/>
      </div>
    </Scroll>),
    foot: (<div>
      <audio src="" id="audio" controls="controls" autoPlay="autoplay"/></div>)
  }}/>);
  const func = {setConf: $actions.setPlayconf, full: true, derction: "botto,", flex: true, stop: true};
  return (<PopUp config={config} content={constent} func={func}/>)
}
