const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super duper secret',
    cookie: {},
    resave: false,
    saveUnintialized: true.valueOf,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess))

// sets handlebars as the view/html of app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middlewear to turn req into json, false to not overwrite database, view path for style will be public folder
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// route
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});

