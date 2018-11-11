import React from 'react';
import comps from "../../comps.js";
import "./List.css"
import tools from "../../tools.js";
const {copy, scrollConf} = tools;
const {PopUp,Icon,Scroll} = comps;
export default function (props) {
  const {config, $actions,playASong,setConf,setConfAct,title, type} = props;
  const {Wrap,Header,HeadNormal} = comps;

  function hidePop(e){setConf({active: false});}
  function openAct(songDto){
    setConfAct({show:true, songDto: songDto});
    setTimeout(() => {setConfAct({active:true});},50);
  }
  const headerConf = {
    left: (<Icon icon={"back1"} handerclick={hidePop}/>),
    title: (<HeadNormal content={title}></HeadNormal>),
    right: (<Icon icon={"gengduo1"}/>),
  };
  const confFn = {
    sheetList: () => config.list.map((item,index) =>
      index < 20 && (<li className="vuc-list-sheet" key={index} onClick={(ev)=>playASong(item.id,ev)}>
        <img src={item.picUrl || item.coverImgUrl} alt=""/>
        <div>{item.name}</div>
      </li>)
    ),
    songList: () => (
      (config.list.tracks || config.list).map((item,index) =>
        index < 20 && (<li className="vuc-list-song" key={index} onClick={()=>playASong(item.id)}>
          <img src={
            item.picUrl ||
            item.album && item.album.picUrl ||
            item.al && item.al.picUrl ||
            item.song && item.song.album && item.song.album.picUrl
          } alt=""/>
          <div><div>{item.name}</div><span>{(item.ar || item.artists) && (item.ar || item.artists).map(item=>item.name).join(" ")}</span></div>
          <Icon icon={"gengduo1"} handerclick={()=>openAct(item)}/>
        </li>)
      )
    ),
  };
  const topFn = {
    songList: () => config.list.coverImgUrl && (<div className="vuc-list-top">
        <img src={config.list.coverImgUrl} alt=""/>
        <div className="vuc-list-cover">
          <span>{config.list.name}</span>
          <b>
            <img src={config.list.creator.avatarUrl} alt=""/>
            {config.list.creator.nickname}</b>
        </div>
      </div>)
  }
  const constent = (<Wrap stop={true} config={{
    head: (<Header config={headerConf}/>),
    content: (<Scroll config={copy(scrollConf,{derction: "y", itemNum:{x:1,y:1},})}><div className="vuc-list-wrap">
      {topFn[type] && topFn[type]()}
      <div className="list-mid">
        <span>播放全部</span>
        <span>收藏</span>
      </div>
      <div className="vuc-list">{confFn[type] && confFn[type]()}</div>
    </div></Scroll>)
  }}/>);
  const func = {setConf: setConf, full: true, derction: "right", flex: true, stop: true};
  return (<PopUp config={config} content={constent} func={func}/>)
}
