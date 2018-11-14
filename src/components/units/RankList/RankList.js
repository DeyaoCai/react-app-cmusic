import React from 'react';
import comps from "../../comps.js";
import "./RankList.css"
import tools from "../../tools.js";
import ctools from "ctools";
const {copy} = ctools;
const { scrollConf} = tools;
const {PopUp,Icon,Scroll} = comps;
export default function (props) {
  const {config, setConf,showDetail} = props;
  const {Wrap,Header,HeadNormal} = comps;
  function hidePop(e){setConf({active: false});}
  const headerConf = {
    left: (<Icon icon={"back1"} handerclick={hidePop}/>),
    title: (<HeadNormal content="排行榜"></HeadNormal>),
    right: (<Icon icon={"gengduo1"}/>),
  };
  const map = {
    "0": "新歌",
    "1": "热歌",
    "2": "原创",
    "3": "飙升",
    "4": "电音",
    // "5": "UK",
    // "6": "Billboard",
    // "7": "KTV",
    // "8": "iTunes",
    // "9": "Hit FM Top",
    // "10": "Oricon",
    // "11": "Melon排",
    // "12": "韩国Mnet",
    // "13": "Melon原声",
    // "14": "港台榜",
    // "15": "内地榜",
    // "16": "龙虎榜",
    // "17": "金曲榜",
    // "18": "中国嘻哈",
    // "19": "NRJ",
    // "20": "台湾Hito",
    // "21": "Beatport",
    // "22": "云音乐ACG",
    // "23": "云音乐说唱榜",
  };

  const arr = Object.values(map);
  function getCode(rank,i) {
    const index = arr.findIndex(key=>new RegExp(key).test(rank.name));
    return index;
  }

  const constent = (<Wrap stop={true} config={{
    head: (<Header config={headerConf}/>),
    content: (<Scroll config={copy(scrollConf,{derction: "y", itemNum:{x:1,y:1},})}><div className="vuc-rank">
      {
        config.list && config.list.list && config.list.list.map((item,index) => getCode(item)+1 ? (<ul key={index} onClick={() => showDetail(getCode(item))}>
          <div>
            <img src={item.coverImgUrl} alt=""/>
          </div>
          <div>{
            item.tracks.map((key,i)=>(<li key={i}>{key.first}</li>))
          }</div>
        </ul>) : "")
      }
    </div></Scroll>)
  }}/>);
  const func = {setConf: setConf, full: true, derction: "right", flex: true, stop: true};
  return (<PopUp config={config} content={constent} func={func}/>)
}
