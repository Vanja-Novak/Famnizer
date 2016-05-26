function Product() {
    if(arguments.length === 1) {
        this.id = arguments['0'];

    } else if(arguments.length === 2) {
        initProduct.call(this, arguments['0'], arguments['1'] );
    } else {
        throw new Error('Wrong room constructor arguments');
    }
}


function initProduct(product, user) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.isClosed = product.isClosed;
    this.room_fk = product.room.id;
    this.created_by = user.id;
    this.owner = product.owner;
    this.filePath = product.filePath;
}

module.exports = Product;