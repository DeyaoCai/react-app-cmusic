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
  // 0 "云音乐新歌榜"
  // 1 "云音乐热歌榜"
  // 2 "网易原创歌曲榜"
  // 3 "云音乐飙升榜"
  // 4 "云音乐电音榜"
  // 5 "UK排行榜周榜"
  // 6 "美国Billboard周榜"
  // 7 "KTV唛榜"
  // 8 "iTunes榜"
  // 9 "Hit FM Top榜"
  // 10 "日本Oricon周榜"

  // 14 "中国TOP排行榜（港台榜）"
  // 15 "中国TOP排行榜（内地榜）"
  // 16 "香港电台中文歌曲龙虎榜"

  // 18 "中国嘻哈榜"
  // 20 "台湾Hito排行榜"
  // 21 "Beatport全球电子舞曲榜"
  // 22 "云音乐ACG音乐榜"
  // 23 "江小白YOLO云音乐说唱榜"

  // -1 "公告牌音乐榜"
  // -1 "抖音排行榜"
  // -1 "云音乐国电榜"
  // -1 "云音乐古典音乐榜"
  // -1 "云音乐韩语榜"
  // -1 "英国Q杂志中文版周榜"
  // -1 "电竞音乐榜"




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
