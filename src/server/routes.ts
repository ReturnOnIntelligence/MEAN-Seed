import * as express from 'express';
import User from './db/entity/user';

export default function setRoutes(app: express.Application) {
  const router = express.Router();

  /**
 * Get name list.
 * @database
 */
  router.route('/name-list').get((req: any, res: any) => {
    User.find({}, (err: any, docs: any) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  });

  /**
 * Add new name.
 * @database
 */
  router.route('/name-list').post((req: any, res: any) => {
    var newUser = new User(req.body);
    newUser.save((err: any, item: any) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  });

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
