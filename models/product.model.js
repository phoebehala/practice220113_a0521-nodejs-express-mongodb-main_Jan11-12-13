// const db = require('../util/db-mysql')
const mongodb = require('mongodb')
const getDB = require('../util/db-mongo').getDB

module.exports = class Products {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save(){
        // return db.execute('INSERT INTO products (title, description, imageUrl, price) VALUES (?, ?, ?, ?)', [this.title, this.description, this.imageUrl, this.price])

        const db = getDB();
        return db.collection('products').insertOne(this) //this >>> prodct obj
    }

    edit(id){
        // return db.execute('UPDATE products SET title=?, description=?, imageUrl=?, price=? WHERE id = ?', [this.title, this.description, this.imageUrl, this.price, this.id])
        const db = getDB();
        const objectId = new mongodb.ObjectId(id)  // convert string id to mongoDB id
        // .update({_id:objectId}, {$set: })  >>> .update({filter}, {the updated data of the obj})
        return db.collection('products').update({_id:objectId}, {$set:this })

    }

    static deleteById(id){
        // return db.execute('DELETE FROM products WHERE products.id = ?', [id])
        const db = getDB();
        const objectId = new mongodb.ObjectId(id)  // convert string id to mongoDB id
        return db.collection('products').deleteOne({_id:objectId})

    }

    //fetch all products

    /* static method
        - we. don't need to initiate in advance in order to call the static methods
        instead of saying:
            const p = new Post();
            p.findAll()
        saying:
            ClassName.findAll();
    */
    static fetchAll(){
        // return db.execute('SELECT * FROM products')
        const db = getDB()
        return db.collection('products').find().toArray()   // .toArray() >>> convert to an array
    }

    static findById(id) {
        // return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
        const db = getDB()
        const objectId = new mongodb.ObjectId(id)  // convert string id to mongoDB id
        return db.collection('products').find({ _id: objectId }).next()
    }
}