"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const createError = require("http-errors");
const expressValidator = require("express-validator");
const path = require("path");
const cookieParser = require("cookie-parser");
const router = require("./routes/router");
const mongoose = require("mongoose");
class App {
    constructor() {
        // initialize app
        this.app = express();
        this.configureMongoose();
        this.setupDatabase();
        this.configureMiddleware();
        this.createRoutes();
        this.configureErrorHandler();
    }
    configureMongoose() {
        // configure mongoose
        const mongoURL = 'URI';
        mongoose.connect(mongoURL);
        mongoose.Promise = global.Promise;
    }
    setupDatabase() {
        // connect to database
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Connection error:'));
    }
    configureMiddleware() {
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(expressValidator());
    }
    createRoutes() {
        // Create router
        this.app.use('/v0', router);
    }
    configureErrorHandler() {
        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(createError(404));
        });
        this.app.use((err, req, res) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
}
exports.default = new App().app;
