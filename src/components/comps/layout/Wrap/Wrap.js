/*

wrap 相当于一个页面容器 占有页面所有的 100% 空间；
然后提供n个容器；
这些容器的

* */
import "./Wrap.css";
export  default  function(){
  return (<div class="vuc-wrap">
    <div className="vue-wrap-head">{/*头部*/}</div>
    <div className="vue-wrap-content">{/*主体*/}</div>
    <div className="vue-wrap-foot">{/*脚部*/}</div>
    <div className="vue-wrap-pop">{/*全屏弹窗*/}</div>
  </div>)
}
