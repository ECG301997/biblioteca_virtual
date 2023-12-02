const productsCtrl = {};
const Product = require('../Models/Products')
const {writeFile} = require('fs/promises')
const fs = require('fs');
const path = require('path')

productsCtrl.getProducts = async(req,res)=>{
    const products = await Product.find();
    res.json(products)
}

productsCtrl.getProduct = async(req,res)=>{
    const product = await Product.findById(req.params.id);;
    res.json(product)
}

productsCtrl.createProduct = async(req,res)=>{
    const {id,name,price,description,stock} = req.body;
    let img = req.body.img;
    img = img.replace(/^data:image\/png;base64,/, '');
    const imgName = `${id}.png`
    await writeFile(`public/image/${imgName}`, img, 'base64');
    const newProduct = new Product({
        id: id,
        name: name,
        price: price,
        description:description,
        img: imgName,
        stock: stock,
        quanty: 1
    });
    await newProduct.save();
    res.json({message: 'Product created'});
}

productsCtrl.updateProduct = async(req,res)=>{
    const {id,name,price,description,image,stock} = req.body;
    await Product.findOneAndUpdate({_id:req.params.id},{
        id,
        name,
        price,
        description,
        image,
        stock
    });
    res.json({message: 'Product updated'});
}

productsCtrl.deleteProducts = async(req,res)=>{
    const product = await Product.findOneAndUpdate({_id:req.params._id})
    const directorio = path.join(__dirname,'../../public/image')
    try {
        fs.unlinkSync(`${directorio}\\${product.id}.png`);
        console.log(`Archivo ${product.id}.png eliminado correctamente`);
    } catch (error) {
        console.error(`Error al eliminar el archivo ${product.id}.png: ${error.message}`);
        throw error;
    }
    await Product.findOneAndDelete(req.params.id);
    res.json({message:'Product Deleted'})
}


module.exports = productsCtrl;