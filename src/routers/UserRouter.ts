import {Router} from 'express';
import {UserController} from '../controllers/UserController';
import {UserValidators} from '../validators/UserValidators';
import {GlobalMiddleWare} from '../middlewares/GlobalMiddleWare';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {
        this.router.get('/send/verification/email', UserValidators.resendVerificationEmail(),UserController.resendVerificationEmail)
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.signUp(), GlobalMiddleWare.checkError, UserController.signUp);
    }

    patchRoutes() {
        this.router.patch('/verify', UserValidators.verifyUser(), GlobalMiddleWare.checkError, UserController.verify);
    }

    deleteRoutes() {

    }
}

export default new UserRouter().router;
