const router = require('express').Router();
//const { afterSync } = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');


// find all tags
router.get('/', async(req, res) => {  
  try {
  const tagdata = await Tag.findAll({
  include: [{ model: Product, through: ProductTag, as: 'tag_tomany_prod' }]    });
  res.status(200).json(tagdata);
  } catch (err) {
  res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id',async(req, res) => {
try {
const tagdata = await Tag.findByPk(req.params.id, {
include: [{ model: Product, through: ProductTag, as: 'tag_tomany_prod' }]    });
res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a new tag
router.post('/',async (req, res) => {
  try {
  const tagdata = await Tag.create({
  tag_name: req.body.tag_name
    });
  res.status(200).json(tagdata);
  } catch (err) {
  res.status(400).json(err);
  }
});
// update a tag's name by its `id` value
router.put('/:id',async (req, res) => {
 try {
    const tagdata = await Tag.update(
      {     tag_name: req.body.tag_name
      },
      {
        where: {   id: req.params.id
        }
      }
    );
    if (!tagdata) {
    res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});
 // delete on tag by its `id` value
router.delete('/:id',async (req, res) => { 

  try {
    const tagdata = await Tag.destroy({
      where: {    id: req.params.id,
      },
    });
  if (!tagdata) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
