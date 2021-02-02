const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session')
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.use('/', userRoutes);

app.listen(3000, () => {
  console.log('App running on port 3000');
})
