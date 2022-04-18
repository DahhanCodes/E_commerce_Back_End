const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll(
      {
        //including the products for each category
        include: {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      }
    );
    res.status(200).json(categories)
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err);
  };
});


router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findOne(
      {
        where: {
          id: req.params.id
        },
        //bringing in the products corresponding to that specific
        //category
        include: {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      }
    );
    res.status(200).json(singleCategory)
  }
  // catching error if GET fails and reporting error
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const createCategory = await Category.create({
      category_name: req.body.category_name
    })
      res.status(200).json(createCategory)
  }
  catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const upCategory = await Category.update(req.body, {
      where:{
        id: req.params.id
      }
    })
    res.status(200).json(upCategory)
  }
  catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const delCategory = await Category.destroy(
      {
      where:{
        id: req.params.id
      }

    })
    res.status(200).json(delCategory)

  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
