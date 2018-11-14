import React from 'react';
import comps from "../../comps.js";
import "./SheetCatlist.css"
import ctools from "ctools";
import tools from "../../tools.js";
const  scrollConf= tools.scrollConf;
const {copy} = ctools;
const {PopUp,Icon,Scroll} = comps;
export default function (props) {
  const {config, getSheet,setConf} = props;
  const {Wrap,Header,HeadNormal} = comps;
  function hidePop(e){setConf({active: false});}
  const headerConf = {
    left: (<Icon icon={"back1"} handerclick={hidePop}/>),
    title: (<HeadNormal content="歌单分类"></HeadNormal>),
    right: (<Icon icon={"gengduo1"}/>),
  };
  const constent = (<Wrap stop={true} config={{
    head: (<Header config={headerConf}/>),
    content: (<Scroll config={copy(scrollConf,{derction: "y", itemNum:{x:1,y:1},})}><div className="vuc-sheet-catlist">
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
    </div></Scroll>)
  }}/>);
  const func = {setConf: setConf, full: true, derction: "right", flex: true, stop: true};
  return (<PopUp config={config} content={constent} func={func}/>)
}
