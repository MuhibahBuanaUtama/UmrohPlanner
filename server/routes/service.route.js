const express = require('express');
const router = express.Router();
const { indexService, showService, storeService, updateService, deleteService } = require('../controllers/service.controller');

router.get('/', indexService);
router.get('/:id', showService);
router.post('/', storeService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

module.exports = router;
