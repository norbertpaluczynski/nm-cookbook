const express = require('express')
const app = express()
const port = 8000

const Liquibase = require('node-liquibase').Liquibase;
const POSTGRESQL_DEFAULT_CONFIG = require('node-liquibase').POSTGRESQL_DEFAULT_CONFIG;

const myConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './resources/db/liquibase/changeLog.xml',
  url: 'jdbc:postgresql://localhost:5432/nmcookbook',
  username: 'nmcookbook',
  password: 'nmcookbook',
}
const instTs = new Liquibase(myConfig);

instTs.update();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
