import React from 'react';
import comps from "../../../comps.js";
import "./RecmendActs.css"
const {PopUp,Icon} = comps;
export default function (props) {
  const {config, $actions,playASong,} = props;
  const func = {setConf: $actions.setPlaceConfRecmendAct, full: false, derction: "", flex: false, stop: false};
  const {Wrap,Header} = comps;
  const constent = (<div className="recmend-act">
    <div>歌曲：白石溪 （Cover洛天依/乐正绫）</div>
    <ul>
      <li><Icon icon={"lunchuan"}/>下一首播放</li>
      <li><Icon icon={"jiudian5"}/>收藏到歌单</li>
      <li><Icon icon={"jiaotong1"}/>下载</li>
      <li><Icon icon={"huoche4"}/>评论</li>
      <li><Icon icon={"guanggaoxuanchuan"}/>分享</li>
      <li><Icon icon={"ranyou"}/>歌手：上升/冥月</li>
      <li><Icon icon={"peixun"}/>专辑：白石溪（Cover 洛天依/乐正绫）</li>
      <li><Icon icon={"lvyou"}/>查看视频</li>
      <li><Icon icon={"yihaopin"}/>不感兴趣</li>
    </ul>
  </div>);
  return (<PopUp config={config} content={constent} func={func}/>)
}
