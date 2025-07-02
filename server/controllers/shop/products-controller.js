const product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    // const {category = [], brand = [], sortBy = "price-lowtohigh"} = req.query;
    const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // if (category.length) {
    //   filters.category = { $in: category.split(",") };
    // }
    // if (brand.length) {
    //   filters.brand = { $in: brand.split(",") };
    // }

    if (typeof category === "string" && category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (typeof brand === "string" && brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    console.log(filters, "filters");
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await product.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id in getProductDetails");
    const foundProduct = await product.findById(id);

    if (!foundProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: foundProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
module.exports = { getFilteredProducts, getProductDetails };
