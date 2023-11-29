//development  localhost
(function (window) {
  window.__env = window.__env || {};
 // window.__env.apiUrl = 'http://192.168.1.220:8088/';
  //window.__env.reportUrl = 'http://192.168.1.138:94/';
   window.__env.apiUrl = 'https://localhost:44322/api/';
  window.__env.secrectKey = '1';
  window.__env.enableDebug = true;
})(this);

////local iis

// (function (window) {
//   window.__env = window.__env || {};
//   window.__env.apiUrl = 'http://192.168.1.172:70/';
//   window.__env.reportUrl = 'http://192.168.1.172:72/';
//   window.__env.secrectKey = '1';
//   window.__env.enableDebug = true;
//  })(this);

// live customer
// (function (window) {
//   window.__env = window.__env || {};
//   window.__env.apiUrl = 'http://172.16.2.33:8082/';
//   window.__env.reportUrl = 'http://172.16.2.33:8081/';
//   window.__env.secrectKey = '1';
//   window.__env.enableDebug = true;
// })(this);
