const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

const routes = require('./routes');
const db = require('./config/db');

const app = express();
const port = 8080;

// HTTP logger
// app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(require('./app/middlewares/SortMiddleware'));

// Template engine
app.engine(
	'hbs',
	handlebars.engine({
		extname: '.hbs',
		helpers: require('./helpers/handlebars.helper'),
	}),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

routes(app);

db.connect();

// Port
app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}`);
});

//127.0.0.1 - local host
