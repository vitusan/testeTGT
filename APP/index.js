if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./util/ExpressError');
const Joi = require('joi');
const userRoutes = require('./routes/users');
const clienteRoutes = require('./routes/clientes');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);
app.use('/clientes', clienteRoutes);


app.get('/', (req, res) => {
    res.render('login');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh loko bixo, algo deu muito errado!';
    res.status(statusCode).render('error', { err });
});

const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Serving on port ${port}`);
});