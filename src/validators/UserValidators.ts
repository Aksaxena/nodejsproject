import {body, query} from 'express-validator';
import User from '../models/User';

export class UserValidators {
    static signUp() {
        return [body('email', 'Email is Required').isEmail().custom((email, {req}) => {
            return User.findOne({email: email}).then(user => {
                if (user) {
                    throw new Error('User Already Exist');
                } else {
                    return true;
                }
            })
        }),
            body('password', 'Password is Required').isAlphanumeric()
                .isLength({min: 8, max: 20}).withMessage('Password can be from 8-20 Characters only'),
            body('username', 'Username is Required').isString()];
    }

    static verifyUser() {
        return [body('verification_token', 'Verification Token is Required').isNumeric()
            , body('email', 'Email is Required').isEmail()]
    }

    static resendVerificationEmail() {
        return [query('email').isEmail()]
    }
}


