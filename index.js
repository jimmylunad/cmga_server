require('dotenv').config();

const Koa         = require('koa');
const cors        = require('koa2-cors');
const etag        = require('koa-etag');
const bodyParser  = require('koa-bodyparser');
const conditional = require('koa-conditional-get');
// const serve       = require('koa-static');

const v1      		= require('./v1');

const app         = new Koa();

app.use(cors());
app.use(conditional());
app.use(etag());
app.use(bodyParser());

// Rutas
app.use(v1.routes());

app.proxy = true;

app.listen(process.env.PORT);

app.on('error', err => {
	console.error(err);
});

console.log(`Servidor escuchando en puerto ${process.env.PORT}`);