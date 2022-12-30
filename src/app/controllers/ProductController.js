const Popular = require('../models/popular')
const { cloneDeep } = require('lodash')

class ProductController{

  // [GET] /detail/create
  create(req, res) {
    res.render('product/create');
  }

  // [POST] /detail/store
  store(req, res) {
    const _product = cloneDeep(req.body)
    _product.currency = "₫"
    if(!_product.videoId) {
      _product.videoId = '6JGKdjeyY7k'
    }
    if(!_product.itemImg) {
      _product.itemImg = `https://img.youtube.com/vi/${_product.videoId}/hqdefault.jpg`
    }
    const product = new Popular(_product)
    Popular.create(product)
        .then(() => res.redirect('/'))
  }

  // [GET] /detail/:id
  detail(req, res) {
    res.send('product/detail');
  }

}

module.exports = new ProductController;