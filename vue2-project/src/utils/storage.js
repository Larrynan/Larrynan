// 操作sessionStorage存储方法
let storage = {
  set (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  get (key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  remove (key) {
    sessionStorage.removeItem(key)
  },
  removeAll () {
    sessionStorage.clear()
  }
}
export default storage
