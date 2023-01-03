const Popular = require('../models/popular');
const {cloneDeep} = require('lodash');
const {multipleObject, simpleObject} = require('../utils/mongoose');

class ProductController{

  // [GET] /product/create
  create(req, res) {
    res.render('product/create');
  }

  // [GET] /product/list
  list(req, res, next) {
    Promise.all([
        Popular.find({}).sortable(req),
        Popular.countDocumentsDeleted({})
    ])
    .then(([populars, deletedCount]) => {
          res.render('product/list',{
                deletedCount,
                populars: multipleObject(populars)});
        })
    .catch(next);
  }

  // [GET] /product/trash
  trash(req, res, next) {
    Promise.all([
        Popular.findDeleted({}),
      Popular.countDocuments({})
    ])
        .then(([populars, countDocuments]) => {
          console.log(populars);
          res.render('product/trash',{
                countDocuments,
                populars: multipleObject(populars)})})
        .catch(next);
  }

// [GET] /product/:id/edit
  edit(req, res, next) {
    Popular.findById(req.params._id).
        then(popular => res.render('product/edit',
            {popular: simpleObject(popular)})).
        catch(next);
  }

  // [PUT] /product/:id/update
  update(req, res, next) {
    Popular.findByIdAndUpdate(req.params._id, req.body).
        then(() => res.redirect('/product/list')).
        catch(next);
  }

  // [PATCH] /product/:id/restore
  restore(req, res, next) {
    Popular.restore({_id: req.params._id}).
        then(() => res.redirect('back')).
        catch(next);
  }

  // [PUT] /product/:id/delete
  destroy(req, res, next) {
    Popular.delete({_id: req.params._id}).
        then(() => res.redirect('back')).
        catch(next);
  }

  // [DELETE] /product/:id/force-delete
  forceDestroy(req, res, next) {
    Popular.deleteOne({_id: req.params._id}).
        then(() => res.redirect('back')).
        catch(next);
  }

  // [POST] /product/handle-actions
  handleActions(req, res, next) {
    Popular.delete({_id: {$in: req.body.cbIds}}).
        then(() => res.redirect('back')).
        catch(next);
  }

  // [POST] /product/store
  store(req, res) {
    const _product = cloneDeep(req.body);
    _product.currency = '₫';
    if (!_product.videoId) {
      _product.videoId = '6JGKdjeyY7k';
    }
    if (!_product.itemImg) {
      _product.itemImg = `https://img.youtube.com/vi/${ _product.videoId }/hqdefault.jpg`;
    }
    const product = new Popular(_product);
    Popular.create(product).then(() => res.redirect('/'));
  }

  // [GET] /detail/:id
  detail(req, res) {
    // Popular.findOne()
    // .then((err, docs))
    res.render('product/detail');
  }

}

module.exports = new ProductController;