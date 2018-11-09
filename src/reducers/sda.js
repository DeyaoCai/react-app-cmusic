

/*
  发现
    歌曲
      歌曲 // 每日推荐 // 最新音乐
      歌单 // 歌单 // 推荐歌单
      排行榜 //

    电台 //

  视频 //

推荐/新/分类



* *//*
import $http from "../http/http";
import React from "react";
/*
{/*最新歌单*/}

*/
const res = {};

res.categories
res.sub

const arr = Object.keys(res.categories).map(item=>({code: item, name: res.categories[item], list: []}));

arr.forEach(item=>(map[item.code] = item));
console.log(arr,map)

res.categories.forEach(item => arr[item.category].list.push(item))






