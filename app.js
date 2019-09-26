const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const { db } = require('./models');

db.authenticate().then(() => {
  console.log('connected to the database');
});

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use('/wiki', require('./routes/wiki'))
app.use('/user', require('./routes/wiki'))

app.get('/', (req, res) => {
  try {
    res.send(layout(''));
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log(' server listening on port 3000');
});
