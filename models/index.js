// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category;// Categories have many Products;// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)

// Products belongsTo Category
Product.belongsTo(Category, {
foreignKey: 'category_id',
onDelete: 'CASCADE',
});
// Categories have many Products
Category.hasMany(Product, {
foreignKey: 'category_id'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'prod_tomany_tag'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tag_tomany_prod'
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
