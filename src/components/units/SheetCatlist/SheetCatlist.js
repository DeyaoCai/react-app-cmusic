import React from 'react';
import comps from "../../comps.js";
import "./SheetCatlist.css"
const {PopUp,Icon} = comps;
export default function (props) {
  const {config, $actions,getSheet,setConf,setConfAct,title, type} = props;
  const {Wrap,Header,HeadNormal} = comps;
  function hidePop(e){setConf({active: false});}
  const headerConf = {
    left: (<Icon icon={"back1"} handerclick={hidePop}/>),
    title: (<HeadNormal content="歌单分类"></HeadNormal>),
    right: (<Icon icon={"gengduo1"}/>),
  };
  const constent = (<Wrap stop={true} config={{
    head: (<Header config={headerConf}/>),
    content: (<div className="vuc-sheet-catlist">
      <div className="vuc-sheet-catlist-all">全部分类</div>
      {
        config.list.map((item, index) => (
          <ul key={index}>
            <li>{item.name}</li>{item.list.map((key, i) =>
            (<li key={i} onClick={()=>
              getSheet(key.name)
            }>{key.name}</li>)
          )}</ul>
        ))
      }
    </div>)
  }}/>);
  const func = {setConf: setConf, full: true, derction: "right", flex: true, stop: true};
  return (<PopUp config={config} content={constent} func={func}/>)
}
