import fs from "fs"

class ProductManager { 

    constructor () {
        this.path = 'products.json'
    }

    async getNewId(newCode) {
        return newCode + 1
    }
    

    async addProduct(product){
        let products = await this.getProducts()
        let newCode = products.length
        product.id = newCode
        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
    }

    async getProducts(){
        let contenido = await fs.promises.readFile(this.path)
        let products = JSON.parse(contenido)
        return products
    }

    async getProductById(id){
        let products = await this.getProducts()
        let idEncontrado =  products.find(product => product.id === id)
        let producto = idEncontrado ? idEncontrado : {msg: 'producto no encontrado actualmente'}
        return producto
    }

    async updateProduct(id, product){
        let products = await this.getProducts()
        let indice = products.findIndex(product => product.id == id)
        if(indice !== -1){
            products[indice] = product;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return {msg: `Producto ${products[indice].id} actualizado`}
    }

    async deleteProduct(id){
        let products = await this.getProducts()
        let indice = products.findIndex(product => product.id === id)
        let productoEliminado
            if(indice !== -1){
                productoEliminado = products.splice(indice, 1)[0]
            }
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return {msg: `Producto ${productoEliminado} eliminado`}
    }
}

const manager = new ProductManager();
let producto1 = {
    title: 'producto2',
    description: 'este producto es...',
    price: 3500,
    thumbnail: 'no img1',
    code: 2,
    stock: 20,
}

let producto2 = {
    title: 'producto5',
    description: 'este producto es..',
    price: 5000,
    thumbnail: 'no img 2',
    code: 2,
    stock: 40
}

//manager.addProduct(producto1)
//let allProducts = await manager.getProducts()
//console.log(allProducts)
//let product = await manager.getProductById(1)
//console.log(product)
//let modificacion = await manager.updateProduct( 0, producto2)
//console.log(modificacion)
let deleteProduct = await manager.deleteProduct(2)
console.log(deleteProduct)

