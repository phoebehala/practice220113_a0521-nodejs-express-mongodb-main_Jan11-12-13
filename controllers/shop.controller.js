const Products = require('../models/product.model')

exports.getProducts = (req,res,next) => {
     /* mySQL approach */
    // Product.fetchAll().then(([rowData, fieldData]) => {
    //     // console.log(rowData) // [ [rows], [configs...] ]

    //     res.render('shop/product-list', {
    //         pageTitle: 'All Products',
    //         products: rowData
    //     })


    // }).catch(err => console.log(err))
   
    /* mongoDB approach */
    // to ask model to interact with db 
    Products.fetchAll().then((products) => {
        console.log('prod: ', products);
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            products: products
        })


    }).catch(err => console.log(err))

}

exports.getProductById = (req,res,next) => {
    const prodId = req.params.productId
    Products.findById(prodId)
    .then((product) => {
        res.render('shop/product-detail', {
           pageTitle: product.title,
           product: product
        })
    })
    .catch((err) => console.log(err))

}