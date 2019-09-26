const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const {db, User, Post} = require('../models/index')




router.get('/', (req, res) => {
  res.redirect('/');
});
router.post('/', (req, res) => {
  // const name = req.body.name;
  // const title = req.body.title;
  // const content = req.body.content;
  // const status = req.body.status;
  // or, the more elegant way....
  const {name, title, content, status, email} = req.body

  res.send(name);
});
router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
