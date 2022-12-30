const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override')

const app = express();
const port = 3000;

const routes = require('./routes')
const db = require('./config/db')

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    ternary :(x, y) => x ? x : y,
    index: (x) => x + 1
  }
}));

 // Method override
app.use(methodOverride('_method'))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app)

db.connect()

// Port
app.listen(port, () => {
  console.log(`listening on port http://localhost:${ port }`);
});

//127.0.0.1 - local host