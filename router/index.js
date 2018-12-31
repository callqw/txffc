/**
 * Created by Administrator on 2018/10/19.
 */
const concrollers = require('../concrollers')
const router = require('koa-router')({
    prefix: '/api'
})
router.get('/crawling/:page', concrollers.crawling.crawling)


module.exports = router;