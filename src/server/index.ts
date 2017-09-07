import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import Config from './config/server.config';
import setRoutes from './routes';
import { DbInit } from './db/mongoose';

/**
 * Client Dir
 * @note `dev` default.
 */
var _clientDir = '../../client/dev';
var app = express();
let logger = require('morgan');

export function init(port: number, mode: string) {
  if (port == null) {
    port = Config.PORT;
  }

  if (mode == null) {
    mode = Config.BUILD_TYPE;
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(compression());

  /* NOTE: This disables caching */
  app.all("/api/*", function noCache(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    next();
  });


  /**
   * Dev Mode.
   * @note Dev server will only give for you middleware.
   */
  if (mode == 'dev') {

    app.all('/*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });
    app.use(logger('dev'));

    let root = path.resolve(process.cwd());
    let clientRoot = path.resolve(process.cwd(), './dist/client/dev');
    app.use(express.static(root));
    app.use(express.static(clientRoot));
  }
  else {
    /**
     * Prod Mode.
     * @note Prod mod will give you static + middleware.
     */

    /**
     * Client Dir
     */
    _clientDir = '../../client/prod';

    /**
     * Static.
     */
    app.use('/js', express.static(path.resolve(__dirname, _clientDir + '/js')));
    app.use('/css', express.static(path.resolve(__dirname, _clientDir + '/css')));
    app.use('/assets', express.static(path.resolve(__dirname, _clientDir + '/assets')));
  }

  DbInit(() => {
    console.log('Connected to MongoDB');

    setRoutes(app);

    app.get('/*', function (req: express.Request, res: express.Response) {
      res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
    });
  });

  /**
   * Server with gzip compression.
   */
  return new Promise<http.Server>((resolve, reject) => {
    let server = app.listen(port, () => {
      var port = server.address().port;
      console.log('App is listening on port:' + port);
      resolve(server);
    });
  });
};
