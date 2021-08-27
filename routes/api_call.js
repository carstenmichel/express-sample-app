var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var content = "<HTML><BODY>";
  var env = process.env;

  Object.keys(env).forEach(function(key) {
    content= content +'<p>key: ' + key + '=' + env[key] +'</p>\n';
  });

  content = content + "</BODY></HTML>";
  res.send(content);

});

module.exports = router;
