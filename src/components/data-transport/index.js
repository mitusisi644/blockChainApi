'use strict'
var axios = require('axios');

module.exports = function (urlCode, formData, successFun, method, isLoading, errorFun) {
  var handleUrl = urlCode
  method = method ? method : 'get'
  var defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  var this_ = this
  $.ajax({
    url: handleUrl,
    type: method,
    data: formData,
    //async: false,
    dataType:"json",
    headers: defaultHeaders,
    success(data) {
      if (data.errCode) {
        typeof errorFun === 'function' ? errorFun(data) : null
        return
      }
      typeof successFun === 'function' ? successFun(data) : null
    },
    error(data){
      var s = data.responseJSON;
      alert(s.error.body);
    }
  })
}
