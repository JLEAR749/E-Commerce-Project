// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongTO(Category);
// Categories have many Products
Category.hasMany(Product);
// Products belongToMany Tags (through ProductTag)
Product.belongTOMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});
// Tags belongToMany Products (through ProductTag)
Tag.belongTOMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
