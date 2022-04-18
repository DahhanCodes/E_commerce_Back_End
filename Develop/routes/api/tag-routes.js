const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      //including all tags
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    });
    res.status(200).json(tags);      
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const singleTag = await Tag.findOne({
      where:{
        id: req.params.id
      },
      //including corresponding product to the tag
      include:{
        model:Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    res.status(200).json(singleTag)
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const createTag = await Tag.create({
      tag_name: req.body.tag_name

    })
    res.status(200).json(createTag)
  }
  catch(err){
    console.log(err),
    json.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try{
    const upTag = await Tag.update(req.body,{
      where:{
        id: req.params.id
      }
    })
    res.status(200).json(upTag)
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const delTag = await Tag.destroy({
      where:{
        id:req.params.id
      }
    })
    res.status(200).json(delTag)
  }
  catch(err){
    console.log(err);
    res.status(500).json(err)
  }
});

module.exports = router;
