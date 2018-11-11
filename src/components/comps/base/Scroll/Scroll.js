import tools from '../../../tools.js';
import React from 'react';
import "./Scroll.css";
const {Drag} = tools;
class Scroll extends React.Component {

  innerStyle () {
    const  state = this.state;
    const sp = this.drag.getSpeed();
    let ti = (Math.pow(sp.x / 20, 2) + Math.pow(sp.y / 20, 2)) / 4 + 0.3;
    const touching = this.drag.isTouching;
    const pos = state.nowPosi;
    touching || (state.posi = { x: pos.x, y: pos.y, });
    ti > 1 && (ti = 1);
    if (this.props.config.takeOneStepAtATime) ti = 0.3;
    return {
      transform: `translate(${pos.x}px,${pos.y}px)`,
      transition: `transform ${touching ? 0 : ti}s ease-out`,
      // height: this.drag.prevent === "y" ? "100%" : "auto"
    }
  }
  init () {
    // 初始化， 为了让用户少输入，所以这里写上一些默认值
    this.props.config || (this.props.config = {});
    const conf = this.props.config;
    // 初始化方向 // 因为调用时考虑的事我要往哪个方向运动，而开发时思考的是要阻止哪个方向 所以做个切换
    this.drag.prevent = conf.derction ? { "": "", x: "y", y: "x", xy: "xy", }[conf.derction] : "";
    // 初始化位置 // 偏移
    conf.index || (conf.index = {});
    const index = conf.index;
    index.x || (index.x = 0);
    index.y || (index.y = 0);
    // 会有多少个子节点
    conf.itemNum || (conf.itemNum = {});
    const itemNum = conf.itemNum;
    itemNum.x || (itemNum.x = 1);
    itemNum.y || (itemNum.y = 1);
    conf.setIndex = this.setIndex;
  }
  // 这里是计算属性
  // indexs () {this.setIndex(this.indexs);}
  // prevent () {
  //   this.drag.prevent = this.props.prevent;
  //   this.props.config.reSetPosiWhenDerctionChanged && (this.props.nowPosi = { x: 0, y: 0, });
  // }

  getOffset (){
    const touching = this.drag.isTouching;
    const offset = this.drag.getOffset();
    const speed = touching ? { x: 0, y: 0, } : this.drag.getSpeed();
    return {
      x: offset.x + speed.x * Math.abs(speed.x) * this.rate,
      y: offset.y + speed.y * Math.abs(speed.y) * this.rate,
    };
  }
  getUnLimitedPosition () {
    const state = this.state;
    const touching = this.drag.isTouching;
    const posi = state.posi;
    const offset = this.drag.getOffset();
    const speed = touching ? { x: 0, y: 0, } : this.drag.getSpeed();
    return {
      x: posi.x + offset.x + speed.x * Math.abs(speed.x) * this.rate,
      y: posi.y + offset.y + speed.y * Math.abs(speed.y) * this.rate,
    };
  }
  getLimitedPosition () {
    const touching = this.drag.isTouching;
    let pos = this.getUnLimitedPosition();
    const { inner, wrap, } = this.getWrapSize();

    const dVal = { x: wrap.x - inner.x, y: wrap.y - inner.y, };
    this[ touching ? "touchingLimit" : "normalLimit" ](pos, dVal);
    return pos;
  }
  normalLimit (pos, dVal) {
    // 越界限制
    if (pos.x > 0) pos.x = 0;
    if (dVal.x > 0) pos.x = 0;
    else if(pos.x < dVal.x) pos.x = dVal.x;

    if (pos.y > 0) pos.y = 0;
    if (dVal.y > 0) pos.y = 0;
    else if (pos.y < dVal.y) pos.y = dVal.y;

    const itemNum = this.props.config.itemNum;
    // 如果x 方向切换
    if (itemNum.x - 1) this.evalIndex(pos, "x");
    // 如果y 方向切换

    if (itemNum.y - 1) this.evalIndex(pos, "y");
  }
  evalIndex (pos, derc) {
    const perLen = this.getWrapSize().wrap[derc];
    const oriIndex = Math.round(pos[derc] / perLen);
    const der = oriIndex >= 0 ? 1 : -1;
    let index = Math.abs(oriIndex);

    const itemNum = this.props.config.itemNum;
    if (index < 0) index = 0;
    if (index >= itemNum[derc]) index = itemNum[derc] - 1;
    this.props.config.index[derc] = index;
    pos[derc] = der * index * perLen;
  }
  getWrapSize () {
    const refs = this.refs;
    const $el = refs.wrap;
    if (!$el) return { wrap: { x: 0, y: 0, }, inner: { x: 0, y: 0, }, };
    const $ele = refs.inner;
    const wrap = { x: $el.offsetWidth, y: $el.offsetHeight, };

    // x 周因为 元素最大为100%，顾需要手动计算 y轴不用
    let ix = $ele.offsetWidth * (this.props.config.itemNum && this.props.config.itemNum.x || 0);
    let iy = $ele.offsetHeight;

    // 当不能根据容器的体积计算出滚动长度的时候， 我们需要根据他的子节点的宽度来让其滚动
    if (this.props.config.isGetInnerSizeByChild) {
      const child = $ele.children[0];
      ix = child ? child.offsetWidth : 0;
      iy = child ? child.offsetHeight : 0;
    }

    const inner = { x: ix, y: iy, };
    return { wrap, inner, };
  }

  touchingLimit (pos, dVal) {
    this.callXTouchingEndFn(pos, dVal);// x 超界回调
    this.callYTouchingEndFn(pos, dVal);// y越界回调
    this.touchingDamp(pos, dVal);// 超界有阻尼
  }
  // 触摸相关函数
  callXTouchingEndFn (pos, dVal) {
    const f = this.damp; // 阻尼
    // x 超界函数
    if (pos.x * f > 50) {
      !this.hasOnEndEv && this.props.config.onLeftEnd && this.props.config.onLeftEnd();
      this.hasOnEndEv = true;
    }
    if ((dVal.x - pos.x) * f > 50) {
      !this.hasOnEndEv && this.props.config.onRightEnd && this.props.config.onRightEnd();
      this.hasOnEndEv = true;
    }
  }
  callYTouchingEndFn (pos, dVal) {
    // y越界回调 显示|隐藏加载更多|刷新提示
    this.showReflashTip = pos.y > 0;
    this.showLoadMoreTip = dVal.y < 0;
  }
  touchingDamp (pos, dVal) {
    const f = this.damp; // 阻尼
    // 超界有阻尼
    if (pos.x > 0) pos.x = pos.x * f;
    if (dVal.x > 0) pos.x = pos.x * f; // 内容没铺满容器
    else if (pos.x < dVal.x) pos.x = (pos.x - dVal.x) * f + dVal.x;
    if (pos.y > 0) pos.y = pos.y * f;
    if (dVal.y > 0) pos.y = pos.y * f;
    else if (pos.y < dVal.y) pos.y = (pos.y - dVal.y) * f + dVal.y;
  }

  setIndex (obj) {
    let { x, y, } = obj;
    const {config} = this.props;
    const state = this.state;
    const itemNum = config.itemNum;
    if (x !== undefined) {
      if (x < 0) x = 0;
      if (x >= itemNum.x - 1) x = itemNum.x - 1;
      config.index.x = x;
      state.nowPosi.x = this.getWrapSize().wrap.x * -x;
    }
    if (y !== undefined) {
      if (y < 0) y = 0;
      if (y >= itemNum.y - 1) y = itemNum.y - 1;
      config.index.y = y;
      state.nowPosi.y = this.getWrapSize().wrap.y * -y;
      state.posi.y = state.nowPosi.y;
    }
    this.setState({});
  }
  touchEv (ev) {
    this.hasOnEndEv = false;
    if (this._isLoading) return;
    this.drag.touchEv(ev);
    this.setState({});
  }
  moveEv (ev) {
    const state = this.state;
    if (this._isLoading) return;
    this.drag.moveEv(ev);
    state.nowPosi = this.getLimitedPosition();
    this.setState({});
  }
  transitionEnd(){
  };
  endEv () {
    const state = this.state;
    if (this._isLoading) return;
    this.drag.endEv();
    if (this.props.config.takeOneStepAtATime) {
      const offset = this.getOffset();
      const oIndex = this.props.config.index;
      const posi = { x: oIndex.x, y: oIndex.y, };
      const { x, y, } = this.getWrapSize().wrap;
      if (offset.x > x / 2) posi.x--;
      if (offset.x < -x / 2) posi.x++;

      if (offset.y > y / 2) posi.y--;
      if (offset.y < -y / 2) posi.y++;
      this.props.config.index = posi;
    } else state.nowPosi = this.getLimitedPosition();
    this.props.config.onTouchEnd && this.props.config.onTouchEnd(this.props.config.index, this.props.config);
    this.drag.endEv();
    this.props.config.takeOneStepAtATime && this.setIndex(this.props.config.index);
    this.setState({});
  }
  constructor(props) {
    super(props);
    this.drag = new Drag();
    this.state = {
      posi: { x: 0, y: 0, },
      nowPosi: { x: 0, y: 0, },
      showReflashTip: false,
      showLoadMoreTip: false,
      _isLoading: false,
      hasOnEndEv: false,
    };
    this.isTransitioning = false;
    this.damp = 0.3;
    this.rate = 0.5;
    this.props.config.getPosi = () => this.posi;

    this.innerStyle = this.innerStyle.bind(this);
    this.touchEv = this.touchEv.bind(this);
    this.moveEv = this.moveEv.bind(this);
    this.endEv = this.endEv.bind(this);
    this.getWrapSize = this.getWrapSize.bind(this);
    this.getUnLimitedPosition = this.getUnLimitedPosition.bind(this);
    this.normalLimit = this.normalLimit.bind(this);
    this.touchingLimit = this.touchingLimit.bind(this);
    this.callXTouchingEndFn = this.callXTouchingEndFn.bind(this);
    this.callYTouchingEndFn = this.callYTouchingEndFn.bind(this);
    this.touchingDamp = this.touchingDamp.bind(this);
    this.setIndex = this.setIndex.bind(this);
    this.evalIndex = this.evalIndex.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);
    this.init = this.init.bind(this);

    this.init && this.init();
  }
  componentDidMount(){
    this.setIndex(this.props.config.index);
  }
  render(){
    return (<div ref="wrap"
      className="vuc-scroll"
      onTouchStart={this.touchEv}
      onTouchMove={this.moveEv}
      onTouchEnd={this.endEv}
    >
      <div ref="inner" onTransitionEnd={this.transitionEnd} className="vuc-scroll-wrap" style={this.innerStyle()} >{this.props.children}</div>
    </div>)
  }
}
export default Scroll;
