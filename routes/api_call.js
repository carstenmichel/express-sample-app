var express = require('express');
var router = express.Router();
var fs = require('fs')
const { Pool, Client } = require('pg')

/* GET users listing. */
router.get('/', function (req, res, next) {
  var dbuser
  var dbpass
  var dbname

  try {
    dbname = fs.readFileSync('/etc/postgres-secret/database-name', 'utf8')
    dbuser = fs.readFileSync('/etc/postgres-secret/database-user', 'utf8')
    dbpass = fs.readFileSync('/etc/postgres-secret/database-password', 'utf8')
  } catch (err) {
    res.send(err.stack)
  }
  const client = new Client({
    user: dbuser,
    host: process.env['POSTGRESQL_SERVICE_HOST'],
    database: dbname,
    password: dbpass,
    port: process.env['POSTGRESQL_SERVICE_PORT'],
  })

  client.connect()
  const text = 'SELECT NOW() as now'

  client
    .query(text)
    .then(films => {
      var content = "<HTML><BODY>";
      content = content + '<p>FILMS</p>\n'
      // films.rows.forEach(row => {

      content = content + '<div>' + films.rows[0] + '</div>\n'

      // }
      content = content + '</BODY></HTML>'
      res.send(content)
    })
    .catch(err => res.send('<div>' + err.stack + '</div>\n'))
});

module.exports = router;
