import React from 'react';
import comps from "../../comps.js";
import "./SearchList.css"
import tools from "../../tools.js";
import ctools from "ctools";
const {copy} = ctools;
const { scrollConf} = tools;
const {PopUp,Icon,Scroll} = comps;
export default function (props) {
  const {config, $actions,playASong,setConf,setConfAct,title, type} = props;
  const {Wrap,Header,HeadNormal} = comps;

  function hidePop(e){setConf({active: false});}
  function openAct(songDto){
    setConfAct({show:true, songDto: songDto});
    setTimeout(() => {setConfAct({active:true});},50);
  }
  const confFn = {
    songList: () => (
      (config.list.tracks || config.list).map((item,index) =>
        index < 20 && (<li className="vuc-search-list-song" key={index} onClick={()=>playASong(item.id)}>
          <div><div>{item.name}</div><span>{(item.ar || item.artists) && (item.ar || item.artists).map(item=>item.name).join(" ")}</span></div>
          <Icon icon={"gengduo1"} handerclick={()=>openAct(item)}/>
        </li>)
      )
    ),
  };
  const topFn = {
    songList: () => config.list.coverImgUrl && (<div className="vuc-search-list-top">
        <img src={config.list.coverImgUrl} alt=""/>
        <div className="vuc-search-list-cover">
          <span>{config.list.name}</span>
          <b>
            <img src={config.list.creator.avatarUrl} alt=""/>
            {config.list.creator.nickname}</b>
        </div>
      </div>)
  }
  const constent = (<Wrap stop={true} config={{
    content: (<Scroll config={copy(scrollConf,{derction: "y", itemNum:{x:1,y:1},})}><div className="vuc-search-list-wrap">
      <div className="list-mid">
        <span>播放全部</span>
        <span>收藏</span>
      </div>
      <div className="vuc-search-list">{confFn[type || "songList"] && confFn[type || "songList"]()}</div>
    </div></Scroll>)
  }}/>);
  const func = {setConf: setConf, full: true, derction: "botto,", flex: true, stop: true};
  return (<PopUp config={config} content={constent} func={func}/>)
}
