import React from 'react';
import comps from "../../comps.js";
import "./RankList.css"
const {PopUp,Icon} = comps;
export default function (props) {
  const {config, setConf,showDetail} = props;
  const {Wrap,Header,HeadNormal} = comps;
  function hidePop(e){setConf({active: false});}
  const headerConf = {
    left: (<Icon icon={"back1"} handerclick={hidePop}/>),
    title: (<HeadNormal content="歌单分类"></HeadNormal>),
    right: (<Icon icon={"gengduo1"}/>),
  };
  const constent = (<Wrap stop={true} config={{
    head: (<Header config={headerConf}/>),
    content: (<div className="vuc-rank">
      {
        config.list && config.list.list && config.list.list.map((item,index)=>(<ul key={index} onClick={() => showDetail(index)}><div><img src={item.coverImgUrl} alt=""/></div><div>{
          item.tracks.map((key,i)=>(<li key={i}>{key.first}</li>))
        }</div> </ul>))
      }
    </div>)
  }}/>);
  const func = {setConf: setConf, full: true, derction: "right", flex: true, stop: true};
  return (<PopUp config={config} content={constent} func={func}/>)
}
