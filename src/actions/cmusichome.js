const actions = {};
[
  "updateSongSheet", "toggleSongSheetState", "fetchSongSheet",
  "updateSongList","toggleSongListtState", "fetchSongList",
  "updateDjprogramList","toggleDjprogramList", "fetchDjprogramList",
  "updatePlayList","togglePlayList", "fetchPlayList",
  "togglePlaceConfRecmend",
].forEach(item => actions[item] = (data) => {return {type: item, data}});
export default actions;
