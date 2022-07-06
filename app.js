require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const indexRouter = require('./routes/index.router');
const mainPageRouter = require('./routes/mainPage.router');
const signup = require('./routes/signup.router');
const signin = require('./routes/signin.router');
const createnewform = require('./routes/createnewform.router');
const detalinformform = require('./routes/detalinformform.router');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');

const sessionConfig = {
  name: 'cycling-trips',
  secret: process.env.SESSION_SECRET ?? 'tigers',
  store: new FileStore(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use(express.static(path.join(process.env.PWD, 'public')));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
app.use(cookieParser());

// место для middleware

// место для ручек
app.get('/', indexRouter);
app.get('/cycling-trips', mainPageRouter);
app.use('/cycling-trips/signup', signup);
app.use('/cycling-trips/signin', signin);
app.use('/cycling-trips/createnewform', createnewform);
app.use('/cycling-trips/detalinformform', detalinformform);

app.listen(PORT, () => console.log(`Connection on PORT: ${PORT}`));
