<template>
  <div
    class="vuc-scroll"
    :class="{shadow:config.needShadow}"
     @touchstart="touchEv($event)"
     @touchmove="moveEv($event)"
     @touchend="endEv()"
     :style="wrapStyle"
  >
    <div class="vuc-scroll-wrap" :style="innerStyle">
      <div class="vue-scroll-reflash" :class="{active:showReflashTip}" v-if="needReflash">下拉刷新</div>
      <slot></slot>
      <div class="vue-scroll-loadmore" :class="{active:!canLoadMore||(canLoadMore&&showLoadMoreTip)}" v-if="needLoading">{{canLoadMore?"上拉加载更多":"无更多数据"}}</div>
    </div>
  </div>
</template>
<script>
import tools from '@/components/tools.js';
const Drag = tools.drag;
export default {
  name: 'vue-scroll',
  data () {
    return {
      drag: new Drag(),
      posi: { x: 0, y: 0, },
      nowPosi: { x: 0, y: 0, },
      damp: 0.3,
      rate: 0.5,
      showReflashTip: false,
      showLoadMoreTip: false,
      _isLoading: false,
      hasOnEndEv: false,
    };
  },
  computed: {
    indexs () { return this.config.index; },
    wrapStyle () {
      if (!this.config.bgUrl) return {};
      const sp = this.drag.getSpeed();
      let ti = (Math.pow(sp.x / 20, 2) + Math.pow(sp.y / 20, 2)) / 4 + 0.3;
      ti > 0.6 && (ti = 0.6);
      const touching = this.drag.isTouching;
      const pos = this.nowPosi;
      touching || (this.posi = { x: pos.x, y: pos.y, });
      return `
        background-image: url(${this.config.bgUrl});
        background-size: ${(18.75 + (pos.y > 0 ? pos.y / 20 : 0)) * (this.config.bgRate || 1)}rem;
        background-repeat: no-repeat;
        background-position: center top;
        transition: background-size ${touching ? 0 : ti}s;
      `;
    },
    innerStyle () {
      const sp = this.drag.getSpeed();
      let ti = (Math.pow(sp.x / 20, 2) + Math.pow(sp.y / 20, 2)) / 4 + 0.3;
      const touching = this.drag.isTouching;
      const pos = this.nowPosi;
      touching || (this.posi = { x: pos.x, y: pos.y, });
      ti > 1 && (ti = 1);
      if (this.config.takeOneStepAtATime) ti = 0.3;
      return {
        transform: `translate(${pos.x}px,${pos.y}px)`,
        transition: `transform ${touching ? 0 : ti}s ease-out`,
        height: this.drag.prevent === "y" ? "100%" : "auto"
      }
    },
    // 假如 用户选用了加载更多或者刷新：
    needReflash () { return !!(this.config && this.config.reflash); },
    needLoading () { return !!(this.config && this.config.loadMore); },

    prevent () { return this.config && this.config.derction ? { "": "", x: "y", y: "x", xy: "xy", }[this.config.derction] : ""; },
    canLoadMore () { return !this.config.noMore; },
    inits () {
      this.drag.prevent = this.prevent;

      this.confg || (this.confg = {});
      const conf = this.config;

      conf.index || (conf.index = {});
      const index = conf.index;
      index.x || (index.x = 0);
      index.y || (index.y = 0);

      conf.itemNum || (conf.itemNum = {});
      const itemNum = conf.itemNum;
      itemNum.x || (itemNum.x = 1);
      itemNum.y || (itemNum.y = 1);
      this.setIndex(index);
      this.config.setIndex = this.setIndex;
    },

  },
  props: [ "config", ],
  mounted () {
    this.config.getPosi = () => this.posi;
    this.inits && this.inits();
  },
  watch: {
    indexs () {
      this.setIndex(this.indexs);
    },
    prevent () {
      this.drag.prevent = this.prevent;
      this.config.reSetPosiWhenDerctionChanged && (this.nowPosi = { x: 0, y: 0, });
    },
  },
  methods: {
    touchEv (ev) {
      this.hasOnEndEv = false;
      if (this._isLoading) return;
      this.drag.touchEv(ev);
    },
    moveEv (ev) {
      if (this._isLoading) return;
      this.drag.moveEv(ev);
      this.nowPosi = this.getLimitedPosition();
    },
    endEv () {
      if (this._isLoading) return;
      this.drag.endEv();
      if (this.config.takeOneStepAtATime) {
        const offset = this.getOffset();
        const oIndex = this.config.index;
        const posi = { x: oIndex.x, y: oIndex.y, }
        const { x, y, } = this.getWrapSize().wrap;
        if (offset.x > x / 2) posi.x--;
        if (offset.x < -x / 2) posi.x++;

        if (offset.y > y / 2) posi.y--;
        if (offset.y < -y / 2) posi.y++;
        this.config.index = posi;
      } else this.nowPosi = this.getLimitedPosition();
      this.config.onTouchEnd && this.config.onTouchEnd(this.config.index, this.config);
    },

    hideFlashTip () {
      this._isLoading = false;
      this.showReflashTip = false;
    },
    onReflash () {
      if (this.needReflash && this.showReflashTip) this.config.reflash(this.config, this.hideFlashTip);
      else this.hideFlashTip();
    },
    hideLoadTip (noMore) {
      this._isLoading = false;
      this.showLoadMoreTip = false;
      this.config.noMore = !!noMore;
    },
    onLoading () {
      if (this.needLoading && this.showLoadMoreTip) {this.config.loadMore(this.config, this.hideLoadTip)}
      else this.hideLoadTip();
    },
    setIndex (obj) {
      let { x, y, } = obj;
      const itemNum = this.config.itemNum;
      if (x !== undefined) {
        if (x < 0) x = 0;
        if (x >= itemNum.x - 1) x = itemNum.x - 1;
        this.config.index.x = x;
        this.nowPosi.x = this.getWrapSize().wrap.x * -x;
      }
      if (y !== undefined) {
        if (y < 0) y = 0;
        if (y >= itemNum.y - 1) y = itemNum.y - 1;
        this.config.index.y = y;
        this.nowPosi.y = this.getWrapSize().wrap.y * -y;
        this.posi.y = this.nowPosi.y;
      }
    },
    getOffset () {
      const touching = this.drag.isTouching;
      const offset = this.drag.getOffset();
      const speed = touching ? { x: 0, y: 0, } : this.drag.getSpeed();
      return {
        x: offset.x + speed.x * Math.abs(speed.x) * this.rate,
        y: offset.y + speed.y * Math.abs(speed.y) * this.rate,
      };
    },
    getUnLimitedPosition () {
      const touching = this.drag.isTouching;
      const posi = this.posi;
      const offset = this.drag.getOffset();
      const speed = touching ? { x: 0, y: 0, } : this.drag.getSpeed();
      return {
        x: posi.x + offset.x + speed.x * Math.abs(speed.x) * this.rate,
        y: posi.y + offset.y + speed.y * Math.abs(speed.y) * this.rate,
      };
    },
    getLimitedPosition () {
      const touching = this.drag.isTouching;
      let pos = this.getUnLimitedPosition();
      const { inner, wrap, } = this.getWrapSize();

      const dVal = { x: wrap.x - inner.x, y: wrap.y - inner.y, };
      this[ touching ? "touchingLimit" : "normalLimit" ](pos, dVal);

      return pos;
    },
    normalLimit (pos, dVal) {
      // y轴 越界回调
      if (pos.y > 0) {
        this._isLoading = true;
        this.onReflash();
      }
      if (dVal.y <= 0 && pos.y < dVal.y) {
        this._isLoading = true;
        this.onLoading();
      }
      // 越界限制
      if (pos.x > 0) pos.x = 0;
      if (dVal.x > 0) pos.x = 0;
      else if(pos.x < dVal.x) pos.x = dVal.x;

      if (pos.y > 0) pos.y = 0;
      if (dVal.y > 0) pos.y = 0;
      else if (pos.y < dVal.y) pos.y = dVal.y;

      const itemNum = this.config.itemNum;
      // 如果x 方向切换
      if (itemNum.x - 1) this.evalIndex(pos, "x");
      // 如果y 防线切换

      if (itemNum.y - 1) this.evalIndex(pos, "y");
    },
    evalIndex (pos, derc) {
      const perLen = this.getWrapSize().wrap[derc];
      const oriIndex = Math.round(pos[derc] / perLen);
      const der = oriIndex >= 0 ? 1 : -1;
      let index = Math.abs(oriIndex);
      const cIndex = this.config.index;

      const itemNum = this.config.itemNum;
      if (index < 0) index = 0;
      if (index >= itemNum[derc]) index = itemNum[derc] - 1;
      this.config.index[derc] = index;
      pos[derc] = der * index * perLen;
    },
    getWrapSize () {
      const $el = this.$el;
      if (!$el) return { wrap: { x: 0, y: 0, }, inner: { x: 0, y: 0, }, };
      const $ele = $el.getElementsByClassName("vuc-scroll-wrap")[0];
      const wrap = { x: $el.offsetWidth, y: $el.offsetHeight, };

      // x 周因为 元素最大为100%，顾需要手动计算 y轴不用
      let ix = $ele.offsetWidth * this.config.itemNum.x;
      let iy = $ele.offsetHeight;

      // 当不能根据容器的体积计算出滚动长度的时候， 我们需要根据他的子节点的宽度来让其滚动
      if (this.config.isGetInnerSizeByChild) {
        const child = $ele.children[0];
        ix = child ? child.offsetWidth : 0;
        iy = child ? child.offsetHeight : 0;
      }

      const inner = { x: ix, y: iy, };
      return { wrap, inner, };
    },

    touchingLimit (pos, dVal) {
      this.callXTouchingEndFn(pos, dVal);// x 超界回调
      this.callYTouchingEndFn(pos, dVal);// y越界回调
      this.touchingDamp(pos, dVal);// 超界有阻尼
    },
    // 触摸相关函数
    callXTouchingEndFn (pos, dVal) {
      const f = this.damp; // 阻尼
      // x 超界函数
      if (pos.x * f > 50) {
        !this.hasOnEndEv && this.config.onLeftEnd && this.config.onLeftEnd();
        this.hasOnEndEv = true;
      }
      if ((dVal.x - pos.x) * f > 50) {
        !this.hasOnEndEv && this.config.onRightEnd && this.config.onRightEnd();
        this.hasOnEndEv = true;
      }
    },
    callYTouchingEndFn (pos, dVal) {
      // y越界回调 显示|隐藏加载更多|刷新提示
      this.showReflashTip = pos.y > 0;
      this.showLoadMoreTip = dVal.y < 0;
    },
    touchingDamp (pos, dVal) {
      const f = this.damp; // 阻尼
      // 超界有阻尼
      if (pos.x > 0) pos.x = pos.x * f;
      if (dVal.x > 0) pos.x = pos.x * f; // 内容没铺满容器
      else if (pos.x < dVal.x) pos.x = (pos.x - dVal.x) * f + dVal.x;
      if (pos.y > 0) pos.y = pos.y * f;
      if (dVal.y > 0) pos.y = pos.y * f;
      else if (pos.y < dVal.y) pos.y = (pos.y - dVal.y) * f + dVal.y;
    },
  },
};
</script>
<style type="text/css" scoped>

/*滚动开始*/
.vuc-scroll{
    flex: 1;
    position: relative;
    overflow: hidden;
    height: 100%;
}
.vuc-scroll-wrap{
    min-width: 100%;
    min-height: 100%;
    position: relative;
    white-space: nowrap;
    font-size: 0;
}
 /*滚动结束*/
 /*滚动开始*/
  .vue-scroll-reflash,
  .vue-scroll-loadmore{
    text-align: center;
    line-height: 2.5rem;
    overflow: hidden;
    height: 0;
    opacity: 0;
    transition: all .3s;
  }
  .vue-scroll-reflash.active,
  .vue-scroll-loadmore.active{
    height: 2.5rem;
    opacity: 1;
  }
  .vuc-scroll.shadow:before{
    content: "";
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 400%;
    background: linear-gradient(to top, transparent 0%,#fff 100%);
    z-index: 1;
  }
 .vuc-scroll.shadow:after{
    content: "";
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 400%;
    background: linear-gradient(to bottom, transparent 0%,#fff 100%);
    z-index: 1;
  }

  /*滚动结束*/
</style>
