export const receivedKeyWord = (state, newStr) => {
  state.Keyword = newStr
}
export const receivedSongid = (state, newStr) => {
  state.songid = newStr
}
export const receivedSongurl = (state, newStr) => {
  state.songurl = newStr
}
export const receivedSongname = (state, newStr) => {
  state.songname = newStr
}
export const receivedSongsinger = (state, newStr) => {
  state.singer = newStr
}
export const receivedSongpic = (state, newStr) => {
  state.songpic = newStr
}
export const receivedSonglrc = (state, newStr) => {
  state.songlrc = newStr
}
export const receivedSongvid = (state, newStr) => {
  state.songvid = newStr
}
export const showSideBar = (state, newStr) => {
  state.showDrawer = newStr
}

export const TOGGLE_SETDRAWER = (state, newStr) => {
  state.showDrawer = newStr
}

export const showBar = (state) => {
  state.isShow = true;
}

export const hideBar = (state) => {
  state.isShow = false
}

export const songindextime = (state, newStr) => {
  state.songindextime = newStr
}
export const album = (state, newStr) => {
  state.album = newStr
}
export const indextimes = (state, newStr) => {
  state.indextimes = newStr
}


export const arrlrc = (state, newStr) => {
  state.arrlrc = newStr
}

export const showns = (state, newStr) => {
  state.showns = newStr
}
//hotmvlist页面是否显示
export const HotMvListShow = (state, newStr) => {
  state.HotMvListShow = newStr
}
export const SearchMVListShow = (state, newStr) => {
  state.SearchMVListShow = newStr
}
export const searchshow = (state, newStr) => {
  state.searchshow = newStr
}

export const allsongarr = (state, newStr) => {
  state.allsongarr = []
  console.log(newStr)
  state.allsongarr = newStr
}


export const songlistid = (state, newStr) => {
  state.songlistid = newStr
}

export const likealbumarr = (state, newStr) => {
  state.likealbumid = newStr
  state.likealbumarr.push(state.likealbumid)
}


// likesongarr
export const likesongarr = (state, newStr) => {
  state.likesong = newStr
  state.likesongarr.push(state.likesong)
}
export const likesonglistarr = (state, newStr) => {
  state.likesonglsitid = newStr
  state.likesonglistarr.push(state.likesonglsitid)
}
export const songsound = (state, newStr) => {
  state.songsound = newStr
  console.log("mu", newStr)
}
export const listclassid = (state, newStr) => {
  state.listclassid = newStr
}

export const audioshow = (state, newStr) => {
  state.audioshow = newStr
}

export const songtime = (state, newStr) => {
  state.songtime = newStr
}
export const timevalue = (state, newStr) => {
  state.timevalue = newStr
}
