var express = require('express');
var router = express.Router();
var fs = require('fs')

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

router.get('/secret', function(req, res, next) {
  var content = "<HTML><BODY>";
  try {
    const data = fs.readFileSync('/etc/postgres-secret', 'utf8')
    content = content + '<p>' +data +'</p>\n'
  } catch (err) {
    content = '<p>file not found</p>\n'
  }
  content = content + "</BODY></HTML>";
  res.send(content);

});

module.exports = router;
