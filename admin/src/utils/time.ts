export function timestampToTime(timestamp:string, number=0) {
  var date = new Date(Number(timestamp))

  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var res = Y + M + D 
  if (number) {
    return res.substring(0, number)
  }
  return res
}
