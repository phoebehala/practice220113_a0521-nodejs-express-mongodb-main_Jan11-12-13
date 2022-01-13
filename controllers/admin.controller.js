const Product = require('../models/product.model')

exports.getAddProduct = (req,res,next) => {
    res.render('shop/add-edit-product', {
        pageTitle: 'Add Product',
        editing: false
    })
}

exports.postAddProduct = (req,res,next) => {
    const { title, imageUrl, description, price } = req.body

    const product = new Product(title, imageUrl, description, price)
    product.save()
    res.redirect('/')  // localhost:8000/
}

exports.getEditProduct = (req,res,next) => {

    const editMode = req.query.edit
    if(!editMode) res.redirect('/')
    
    const prodId = req.params.productId

    /* for mySQL
    Product.findById(prodId)
    .then(([rowData, fieldData]) => {
        console.log(rowData[0]);
        res.render('shop/add-edit-product', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: rowData[0]
        })
    })
    .catch(err => console.log(err))
    */

    /* for mongoDB */
    Product.findById(prodId)
    .then((product) => {   // get back single product
        console.log(product);
        res.render('shop/add-edit-product', {
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req,res,next) => {
    /* for mySQL
    const {title, imageUrl, description, price} = req.body
    const updatedProduct = new Product(title, imageUrl, description, price)
    updatedProduct.edit()
    res.redirect('/')
    */

    /* for mongoDB */
    // productId >>> is the value of the name attribute inside add-edit-product.ejs : <input type="hidden" value="<%= product._id %>" name="productId" />
    const {productId, title, imageUrl, description, price} = req.body
    const updatedProduct = new Product(title, imageUrl, description, price)
    updatedProduct.edit(productId)
        .then(()=>{
            res.redirect('/')
        }).catch(err => console.log(err))
    

}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId

    // ask Model to interact with db
    Product.deleteById(prodId)
        .then(()=>{
            res.redirect('/')
        }).catch(err => console.log(err))
    
}