const Sequelize = require('sequelize');
const { db } = require('./db');

const getSlug = title => {
  const regex = new RegExp(' ');
  let newTitle = title.replace(regex, '_');
  return newTitle;
};

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeValidate((req, res) => {
  req.slug = getSlug(req.title);
});

module.exports = Page;
