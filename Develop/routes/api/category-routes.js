const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ["id", "product_name", "price", "stock", "category_id"],
  },
].
})
.then((dbCatergoryData) => res.json(dbCatergoryData)
.catch ((err) => {
  console.log(err);
  res.status(500).json(err);
});
}

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name","price", "stock", "category_id"], 
      },
    ],
  })
  .then((dbCatergoryData)=> {
    if (!dbCatergoryData) {
      res
      .status(404)
      .json({message: "There was no category found for this id."});
      return;
    }
    res.json(dbCatergoryData);
  })
  .catch(err) => {
    res.status(500).json(err);
  });


router.post('/', (req, res) => {
  Category.create({
    category_Name: req.body.category_Name,
  })
  .then((dbCatergoryData)=> res.json(dbCatergoryData))
  .catch ((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
