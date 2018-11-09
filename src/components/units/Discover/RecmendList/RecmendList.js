import React from 'react';
import comps from "../../../comps.js";
import "./RecmendList.css"
const {PopUp,Icon} = comps;
export default function (props) {
  const {config, $actions,playASong,} = props;
  const func = {setConf: $actions.setPlaceConfRecmend, full: true, derction: "right", flex: true, stop: true};
  const {Wrap,Header,HeadNormal} = comps;
  function hidePop(e){
    $actions.setPlaceConfRecmend({active: false});
  }
  function openAct(songDto){
    $actions.setPlaceConfRecmendAct({show:true, songDto: songDto});
    setTimeout(() => {
      $actions.setPlaceConfRecmendAct({active:true});
    },50);
  }
  const constent = (<Wrap stop={true} config={{
    head: (<Header config={{
      left: (<Icon icon={"back1"} handerclick={hidePop}/>),
      title: (<HeadNormal content={"每日推荐"}></HeadNormal>),
      right: (<Icon icon={"gengduo1"}/>),
    }}/>),
    content: (<div className="recmend-list">{
      config.list.map((item,index) => (
        <li key={index} onClick={()=>playASong(item.id)}>
          <img src={item.album.picUrl} alt=""/>
          <div>
            <div>{item.name}</div>
            <span>{item.reason}</span>
          </div>
          <Icon icon={"gengduo1"} handerclick={()=>openAct(item)}/>
        </li>
      ))}</div>)
  }}>


  </Wrap>);
  return (<PopUp config={config} content={constent} func={func}/>)
}
