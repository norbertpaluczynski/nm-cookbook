const express = require('express')
const Keycloak = require('keycloak-connect')
const session = require('express-session')
const app = express()
const port = 8000

var memoryStore = new session.MemoryStore();                       
var keycloak = new Keycloak({ store: memoryStore });
     
app.use(session({
    secret:'BeALongSecret',                         
    resave: false,                         
    saveUninitialized: true,                         
    store: memoryStore                       
}));

app.use(keycloak.middleware());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/authtest', keycloak.protect(), (req, res) => {
  res.send('secured endpoint')
})

app.use( keycloak.middleware( { logout: '/logout'} ));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
