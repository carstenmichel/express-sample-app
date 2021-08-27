var express = require('express');
var router = express.Router();
var fs = require('fs')
const { Pool, Client } = require('pg')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var dbuser
  var dbpass
  var dbname
  var content = "<HTML><BODY>";

  try {
    dbname = fs.readFileSync('/etc/postgres-secret/database-name', 'utf8')
    dbuser = fs.readFileSync('/etc/postgres-secret/database-user', 'utf8')
    dbpass = fs.readFileSync('/etc/postgres-secret/database-password', 'utf8')
  } catch (err) {
    content = '<p>file not found</p>\n'
  }
  const client = new Client({
    user: dbuser,
    host: process.env['POSTGRESQL_SERVICE_HOST'],
    database: dbname,
    password: dbpass,
    port: process.env['POSTGRESQL_SERVICE_PORT'],
  })

  content = content + '<p>' + client.host + '</p>\n'
  content = content + '<p>' + client.user + '</p>\n'
  content = content + '<p>' + client.port + '</p>\n'
  content = content + '<p>' + client.database + '</p>\n'



  client.connect()
  content = content +'<p>FILMS</p>\n'
  client.query('SELECT * from films;', (err, response) => {
    content = content + '<div>' + response +'</div>\n'
    content = content + '<div>' + err +'</div>\n'

    client.end()
  })


  content = content + "</BODY></HTML>";
  res.send(content);

});

module.exports = router;
