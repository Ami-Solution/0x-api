import express = require('express');
import logger = require('morgan');
import createError = require('http-errors');
import expressValidator = require('express-validator');
import path = require('path');
import cookieParser = require('cookie-parser');
import router = require('./routes/router');
import mongoose = require('mongoose');

class App {
  // initialize app and database properties
  public app: any;
  public db: any;

  constructor() {
    // initialize app
    this.app = express();

    this.configureMongoose();

    this.setupDatabase();

    this.configureMiddleware();

    this.createRoutes();

    this.configureErrorHandler();

  }

  private configureMongoose() {
    // configure mongoose
    const mongoURL = 'URI';
    mongoose.connect(mongoURL);
    mongoose.Promise = global.Promise;
  }
  private setupDatabase() {
    // connect to database
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'Connection error:'));
  }

  private configureMiddleware()  {
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

  private createRoutes() {
    // Create router
    this.app.use('/v0', router);
  }

  private configureErrorHandler() {
    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      next(createError(404))
    })
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

export default new App().app;
