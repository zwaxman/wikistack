const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9_]*$/,
      notContains: ' ',
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeValidate((page) => {
  page.slug = slugify(page.title)
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
});

const sync = async () => {
  await db.sync({ force: true });
};

sync();

module.exports = {
  db,
  User,
  Page,
};

const slugify = function(str) {   
  let newStr = str.replace(/\s+/g, '_').replace(/\W/g, '')
  if (newStr === ''){
    newStr = Math.random().toString(36).replace(/\./g,'')
  }
  return newStr
}