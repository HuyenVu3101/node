const popular = require('../models/popular');
const { multipleObject } = require('../utils/mongoose')

class SiteController{

  // [GET] /search
  search(req, res) {
    res.render('search');
  }

  // [GET] /
  home(req, res, next) {
    popular.find({})
        .then(populars => {
          res.render('home', { populars: multipleObject(populars) });
        })
        .catch(next)


    // test.find({})
    // .then(test => {
    //   console.log('test ',test);
    //   res.render('home', {test});
    // })
    // .catch(next);

  }

}

module.exports = new SiteController;