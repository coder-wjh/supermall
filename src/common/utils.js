// 防抖
export function debounce(func,delay) {
  let timer = null

  return function(...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}


// 时间格式化
export function formatDate(date, fmt) {
  // 1.获取年份
  // y+ 表示一个或多个y
  // y* 0个或多个y
  // y? 0或1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  // 2.
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),//h:十二小时制 H：二十四小时制
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

// 不足两位补齐两位
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}