const path = require('path');
const express = require('express');
const exphbs = require('express-handlebards');
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');

// sets handlebars as the view/html of app
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middlewear to turn req into json, false to not overwrite database, view path for style will be public folder
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

// route
app.use(require('./controllers/dish-routes'))

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`))
})

