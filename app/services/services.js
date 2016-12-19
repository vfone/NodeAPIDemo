var prependFile = require('prepend-file');
module.exports = function(context){
  switch (context.service) {
    case 'prependFile':
      prependFile(context.file, context.msg, function (err) {
        if(err){
            console.log(err);
        }
      });
      break;
    case 'other':
      console.log('other');
      break;
    default:
      console.log('please define service type');
      break;
  }
}
