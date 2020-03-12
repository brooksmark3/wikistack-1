const express = require('express');
const wikiRouter = express.Router();
const views = require('../views');
const { Page } = require('../models');
const { blue, cyan, green, red } = require('chalk');

module.exports = wikiRouter;

wikiRouter.get('/', (req, res) => {
  res.send(views.layout(''));
});

wikiRouter.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await page.save();
    console.log(green(page));
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

wikiRouter.get('/add', (req, res) => {
  res.send(views.addPage());
});

wikiRouter.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.json(page);
  } catch (error) {
    next(error);
  }
});
