
const newsRoute = require('./news_route')
const siteRoute = require('./site_route')

const route = (app) => {
  app.use('/news', newsRoute)
  app.use('/', siteRoute);
}

module.exports = route
