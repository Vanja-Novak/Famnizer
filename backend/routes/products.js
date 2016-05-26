var express = require('express');
var router = express.Router();
var db = require('../db');
var Product = require('../model/Product');
var RecordExistsError = require('../errors/RecordExistsError');
var ObjectNotFoundError = require('../errors/ObjectNotFoundError');
var fs = require('fs');

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}

router.get('/room/:room_id',function(req,res,next) {
    db.getProductsWithRoomId(req.params.room_id,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Материалы не найдены"));
        } else {
            res.send(rows);
        }
    });
});

router.put('/', function(req, res, next) {
    var user = req.currentUser;
    var product = new Product(req.body.product, user);
    db.addProduct(product, function(err, rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Ошибка при создании материала"));
        } else {
            var productId = rows.insertId;
            var filePath = "resources/" + productId + ".txt";
            fs.writeFile(filePath, product.description ,function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            res.send(rows);
        }
    });
});

router.delete('/:product_id', function (req,res,next) {

    var productId = req.params.product_id;
    var filePath = "resources/" + productId + ".txt";
    if(fileExists(filePath)) {
        fs.unlink(filePath);
    }
    db.deleteProductById(productId,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Материал не найден"));
        } else {
            res.send(rows);
        }
    });
});

router.get('/download/:product_id', function(req, res, next) {
    var filename = 'resources/' + req.params.product_id + '.txt';
    if(fileExists(filename)) {
        var rstream = fs.createReadStream(filename);
        rstream.pipe(res);
    }else {
        res.statusCode(204);
        res.write("Material doesn'exist");
        res.end();
    }
});

router.put('/assignee', function(req, res, next) {
    var product = req.body.product;
    var userId = req.body.user.id;
    db.assigneeUserToProduct(product.id, userId,function(err,rows, fields) {
        if (err) {
            next(new ObjectNotFoundError(500, "Материал не найден"));
        } else {
            res.send(rows);
        }
    });
});


module.exports = router;