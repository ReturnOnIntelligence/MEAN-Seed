import User from '../db/entity/user';
import { Observable } from 'rxjs/Observable';

export class UserServise {
    getUsers(callback?: (err: any, res: Document[]) => void) {
        return User.find({}, callback);
    };

    saveNewUser(name: string, fn?: (err: any, product: this, numAffected: number) => void) {
        var newUser = new User(name);
        return newUser.save(fn);
    };
};