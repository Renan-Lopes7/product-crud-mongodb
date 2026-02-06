const conn = require('../db/conn'); //vamos chamar a nossa conecxão ao banco

const mongo = require('mongodb');// esse cara chamamos para nos dar o ID corretamente "ObjectId"




class Product {
    constructor(name, image, price, description) {
        this.name = name,
            this.image = image,
            this.price = price,
            this.description = description
    }

    save() {
        const product = conn.db().collection('products').insertOne({
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description
        })

        return product
    }
    //resgatar os dados em mongo
    static getProducts() {
        const products = conn.db().collection('products').find().toArray()

        return products
    }


    //criando a função aqui
    static async getProductById(id) {

        const product = await conn.db().collection('products').findOne({ _id: new mongo.ObjectId(id) })

        return product

    }

    //removendo dados
    static async removeProductById(id) {

        await conn.db().collection('products').deleteOne({ _id: new mongo.ObjectId(id) })

        return



    }
    updateProduct(id) {
        conn.db().collection('products').updateOne({ _id: new mongo.ObjectId(id) }, { $set: this })

        return

    }


}


module.exports = Product