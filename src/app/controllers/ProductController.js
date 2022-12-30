const Popular = require('../models/popular')
const { cloneDeep } = require('lodash')
const { multipleObject, simpleObject} = require('../utils/mongoose')

class ProductController{

  // [GET] /product/create
  create(req, res) {
    res.render('product/create');
  }

  // [GET] /product/update
  list(req, res, next) {
    Popular.find({})
    .then( populars => res.render('product/list', { populars: multipleObject(populars) }))
    .catch(next)
  }

// [GET] /product/:id/edit
  edit(req, res, next) {
    Popular.findById(req.params._id)
        .then( popular => res.render('product/edit', {popular: simpleObject(popular)}) )
        .catch(next)
  }

  // [PUT] /product/:id/update
  update(req, res, next) {
    Popular.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.redirect('/product/list'))
        .catch(next)
  }

  // [POST] /product/store
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
    // Popular.findOne()
    // .then((err, docs))
    res.render('product/detail');
  }

}

module.exports = new ProductController;