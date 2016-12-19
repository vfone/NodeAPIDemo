//write to access log

var zeroPrefix = function(num){
  return num<10?'0'+num:num;
}
// get datetime
var now       = new Date;
var Months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var fullDate  = now.getUTCFullYear() + '-' + Months[now.getUTCMonth()] + '-' + zeroPrefix(now.getUTCDate());
var utcTime   = fullDate + '   ' + zeroPrefix(now.getUTCHours()) + ':' + zeroPrefix(now.getUTCMinutes()) + ':' + zeroPrefix(now.getUTCSeconds()) + ' (UTC)';



module.exports = {
  fullDate:     fullDate,
  utcTime:      utcTime
};
