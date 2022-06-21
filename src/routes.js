const { Router } = require('express');

const router = Router();
const AuthController = require('./app/controllers/AuthController');
const UserController = require('./app/controllers/UserController');
const AdsController = require('./app/controllers/AdsController');
const Auth = require('./middlewares/Auth');

router.get('/ping', (request, response) => {
  response.json({ pong: true });
});
router.get('/states', UserController.getStates);
router.post('/user/login', AuthController.login);
router.post('/user/signup', AuthController.signup);
router.get('/categories', AdsController.getCategories);
router.get('/ad/list', AdsController.index);
router.get('/ad/item', AdsController.show);

// Private routes
router.use(Auth.private);
router.post('/ad/add', AdsController.create);
router.post('/ad/:id', AdsController.update);
router.get('/user/me', UserController.info);
router.put('/user/me', UserController.update);

module.exports = router;
