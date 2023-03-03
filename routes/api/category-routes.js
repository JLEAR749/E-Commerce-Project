const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
  {
    model: Product,
    attributes: ["id", "product_name", "price", "stock", "category_id"],
  },
    ],
  })
.then((dbCatergoryData) => res.json(dbCatergoryData))
.catch ((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

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
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  console.log(req.body)
  Category.create({
    category_name: req.body.category_name,
  })
  .then((dbCatergoryData)=> {
    res.json(dbCatergoryData)
  })
  .catch ((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
  {
    where: {
      id: req.params.id,
    },
  }
)
.then((dbCatergoryData)=> {
  if (!dbCatergoryData) {
    res.status(404).json({message: "There was no category found with this id."});
    return;
  }
  res.json(dbCatergoryData);
})
.catch((err)=> {
  console.log(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCatergoryData => { 
    if (!dbCatergoryData) {
      res.status(404).json({message: "There was no category found with this id."});
      return;
    }
    res.json(dbCatergoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
