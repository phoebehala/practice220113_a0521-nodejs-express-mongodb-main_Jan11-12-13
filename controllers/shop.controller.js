const Products = require('../models/product.model')
const Cart = require('../models/cart.model')

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



exports.postCart = (req, res, next) =>{
                                            // .productId >>> is the name from shop/product-list.ejs   <input type="hidden" name="productId" value="<%= product._id %>" />
    const {productId, productPrice} = req.body // .productPrice >>> is the name from shop/product-list.ejs   <input type="hidden" name="productPrice" value="<%= product.price %>" />
    //console.log(productId, productPrice);

    // to ask model to interact with db 
    Cart.addProduct(productId, productPrice)
    res.redirect('/')
}

exports.getCart = (req, res, next) =>{
    
    Cart.getCart((cart)=>{
        //console.log('cart.products',cart.products);

        //   Products.fetchAll() >>> return Promise
        Products.fetchAll().then((products) =>{
            //console.log(products);

            const cartProducts = []
            
            // to go through each product from db-products colletion and see the matches between products in the carts
            for (product of products){
                //console.log(product);

                // cart.products >>> the array of products in the cart
                const cartProductData = cart.products.find(cartProd=>cartProd.id === product._id.toString()) // .find() >>>  returns the value of the first element that passes a test.
                //console.log('cartProductData', cartProductData);

                if (cartProductData){
                    // cartProducts.push(cartProductData)
                    cartProducts.push({
                        productData:cartProductData,
                        quantity:cartProductData.quantity
                    })
                }  
            }
            //console.log('cart: ', cartProducts);
            // res.render({cartProducts})

            // response to views -shop/cart.ejs 
            res.render('shop/cart',{
                pageTitle: 'Your Cart',
                products: cartProducts
            })

        }).catch(err => console.log(err))

     
    })
}


exports.postCartDeleteProduct= (req, res, next)=>{
    const {productId} = req.body  // .productId >>> is the name from shop/cart.ejs   <input type="hidden" name="productId" value="<%= product.productData.id %>" />

    Products.findById(productId).then((product) => {
        console.log(product);

        Cart.deleteProduct(productId, product.price)
        res.redirect('/cart')
    }).catch(err => console.log(err))

}