const Router      = require('koa-router');
const multer      = require('koa-multer');
const router      = new Router({ prefix: '/v1' });

const middleware  = require('./middleware');

const forms       = require('./routes/forms');

router.use(middleware.log);
router.use(middleware.handle_error);

router.post('/save_contact',	forms.contact);

module.exports = router;