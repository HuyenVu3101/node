const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/ProductController')

router.get('/create', productController.create)
router.get('/list', productController.list)
router.get('/:_id/edit', productController.edit)
router.put('/:_id/update', productController.update)
router.delete('/:_id/delete', productController.destroy)
router.post('/store', productController.store)
router.get('/:id', productController.detail)

module.exports = router
