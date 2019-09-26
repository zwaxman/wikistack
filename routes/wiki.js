const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const {db, User, Page} = require('../models/index')




router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', async (req, res, next) => {
  // const name = req.body.name;
  // const title = req.body.title;
  // const content = req.body.content;
  // const status = req.body.status;
  // or, the more elegant way....
  const {name, title, content, status, email} = req.body
  console.log('content', content)
  try {
    const page = await Page.create({title: title, content: content, status: status})
    console.log('page added', page.dataValues)
  } catch (error) {
    next(error)
  }
  
  res.redirect('/');
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
