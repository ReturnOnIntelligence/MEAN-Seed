import * as mongoose from 'mongoose';
import Config from '../config/server.config';

export function DbInit(listener: Function) {
    let uri = Config.MONGO_CONNECTION;
    mongoose.connect(uri, { useMongoClient: true });
    const db = mongoose.connection;
    (<any>mongoose).Promise = global.Promise;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', listener);
}
