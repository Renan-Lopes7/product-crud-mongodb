const Product = require('../models/Product') //chamar o model de product


module.exports = class ProductController {

    static async showProducts(req, res) {
        const products = await Product.getProducts()

        //resgatando os dados em mongo
        res.render('products/all', { products });
    }
    static createProduct(req, res) {
        res.render('products/create');
    }
    static createProductPost(req, res) {
        //pego os dados que eu preciso 
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        //passo os dados pra ele
        const product = new Product(name, image, price, description);
        //salvo no banco
        product.save();

        res.redirect("/products");

    }

    //resgatando um dado
    static async getProduct(req, res) {
        const id = req.params.id

        const product = await Product.getProductById(id);//getProduct() ate entao nao existe temos que ir no model e criar ele

        res.render('products/product', { product });
    }

    //removendo dados
    static async removeProduct(req, res) {
        const id = req.params.id

        await Product.removeProductById(id);

        res.redirect('/products');

    }
    //editando dados
    static async editProduct(req, res) {
        const id = req.params.id

        const product = await Product.getProductById(id);

        res.render('products/edit', { product });



    }

    //editando/salvando dados no banco 
    static async editProductPost(req, res) {
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description

        const product = new Product(name, image, price, description);

        await product.updateProduct(id);


        res.redirect('/products');


    }
}
//