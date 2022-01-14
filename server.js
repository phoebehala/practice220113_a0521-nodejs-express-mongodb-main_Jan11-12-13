const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoConnect = require('./util/db-mongo').mongoConnect

const shopRoute = require('./routes/shop.route')
const adminRoute = require('./routes/admin.route')
const User = require('./models/user.model')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
// app.use('/public', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

// dummy auth flow
app.use((req, res, next)=>{
    /* hard code to insert a new user to db
    const user = new User('admin', 'admin@hala.com')
    user.save().then(result => {
            console.log(result)
            next()
        }).catch(err=>console.log(err))
    */
    User.findById('61e09cc50b90cd7dfeb045de')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoute)
app.use(shopRoute)
app.use((req,res,next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found'})
})

const PORT = process.env.PORT || 8000

// after the connection successfully connected, fire the callback () => { app.listen(PORT)}
mongoConnect(() => {
    app.listen(PORT)
})