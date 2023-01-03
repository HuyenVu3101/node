const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/ProductController')

router.get('/create', productController.create)
router.get('/list', productController.list)
router.get('/trash', productController.trash)
router.post('/store', productController.store)
router.post('/handle-actions', productController.handleActions)
router.get('/:_id/edit', productController.edit)
router.put('/:_id/update', productController.update)
router.patch('/:_id/restore', productController.restore)
router.delete('/:_id/delete', productController.destroy)
router.delete('/:_id/force-delete', productController.forceDestroy)
router.get('/:id', productController.detail)

module.exports = router
