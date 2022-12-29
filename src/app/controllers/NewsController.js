class NewsController{

  // [GET] /news
  index(req, res) {
    res.render('news');
  }
  // [GET] /news/:slug
  detail(req, res) {
    res.send('DETAIL!!')
  }

}

module.exports = new NewsController