
const news = require('./news_route')
const product = require('./product_route')
const site = require('./site_route')

const route = (app) => {
  app.use('/news', news)
  app.use('/product', product)
  app.use('/', site);
}

module.exports = route
