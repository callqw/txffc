/**
 * Created by Administrator on 2018/10/19.
 */
const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const debug = require('debug')('koa-weapp-demo')
const config = require('./config')
const router = require('./router')
const render = require('koa-ejs');
const path = require('path');
const app = new Koa();
const logger    = require('koa-logger');
app.use(logger());
const __static  = require('koa-static');


// parse request body:
app.use(bodyParser());

app.use((ctx, next )=> {
    const start = Date.now();
    return next().then(() => {
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
})

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'default',
    viewExt: 'html',
    cache: false,
    debug: false
});
console.log(__dirname + '/assets','aa')
app.use(__static(__dirname + '/assets'));
app.use(router.routes())
    .use(router.allowedMethods())
    .listen(config.port, ()=>{
        debug(`listening on port ${config.port}`),console.log(`listening on port ${config.port}`)
})