
class SiteController{

  // [GET] /search
  search(req, res) {
    res.render('search')
  }
  // [GET] /
  home(req, res) {
    res.render('home');
  }

}

module.exports = new SiteController