const { Router } = require('express');

const router = Router();
const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const AdsController = require('./app/controllers/AdsController');
const Auth = require('./middlewares/Auth');
const AuthValidator = require('./app/validators/AuthValidator');

router.get('/ping', (request, response) => {
  response.json({ pong: true });
});
router.get('/states', UserController.getStates);
router.post('/user/login', AuthValidator.LogIn, AuthController.logIn);
router.post('/user/signup', AuthValidator.signUp, AuthController.signUp);
router.get('/categories', AdsController.getCategories);
router.get('/ad/list', AdsController.index);
router.get('/ad/item', AdsController.show);

// Private routes
router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me', Auth.private, UserController.update);
router.post('/ad/add', Auth.private, AdsController.create);
router.post('/ad/:id', Auth.private, AdsController.update);

module.exports = router;
