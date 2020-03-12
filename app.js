const express = require('express');
const morgan = require('morgan');
const views = require('./views');
const app = express();
const { db, page, user } = require('./models');
const { blue, cyan, green, red } = require('chalk');
const PORT = 3000;
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

db.authenticate().then(() => {
  console.log('connected');
});

async function init() {
  // console.log(cyan(db));
  // console.log(red(user));
  // console.log(green(page));
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
