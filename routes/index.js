var express = require('express');
var router = express.Router();

const db = require('../utils/db')
const tableName = "shoppingList"
/* GET home page. */
router.get('/', (req, res, next) => {
  db.findAll(tableName).then((results) => {
    res.json(results)
  })
});

router.get('/:id', (req,res,next) => {
  db.findById(tableName, req.params.id).then((results) => {
    res.json(results)
  })
})

router.post('/', (req,res,next) => {
  db.insertNew(tableName, {
    product: req.body.product,
    quantity: req.body.quantity

  }).then((results) => {
    res.json(results)
  })
})

router.put('/:id', (req,res,next) => {
  db.update(tableName,req.params.id,{
    product: req.body.product,
    quantity: req.body.quantity
  }).then((results) => {
    res.json(results)
  })
})

router.delete('/:id', (req,res,next) => {
  db.delete(tableName, req.params.id).then((results) => {
    res.json(results)
  })
})

module.exports = router;
