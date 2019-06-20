const Prod = require('../model/productModel');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var fs = require('fs');

//------------------------------------ Operations user data --------------------------------------
exports.loginUser = (req, res, next) => {
    Prod.find({
        email: req.body.email, companyName: req.body.companyName
    }).then(data => {
        console.log(data)
        if (data) {
            const token = jwt.sign({
                email: data.email,
                _id: data._id,
                companyName: data.companyName
            },
                'secret',
                {
                    expiresIn: "5h"
                });
            res.status(201).json({
                message: "Loged In",
                body: data,
                token: token
            });
        } else {
            res.status(201).json({
                message: "Unauthorised",
            });
        }
    }).catch(err => {
        res.status(400).json({
            message: err,
        });
    })
}

multer({ dest: './api/upload-image/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './api/upload-image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.image)
    }
})
var upload = multer({ storage: storage });

exports.addProduct = (req, res) => {
    console.log('init');
    console.log(req.body.companyName);
    // console.log(req.image, 'files');
    let prod;
    
    if (req.body.image) {
        console.log("XXXXXXXXXXXXXXXXX",req.body)
        prod = new Prod({
            companyName: req.body.companyName,
            price: req.body.price,
            email: req.body.email,
            // image: new Buffer.from(encode_image, 'base64'),
            image:req.file.filename
        });
    }else{
        prod = new Prod({
            companyName: req.body.companyName,
            price: req.body.price,
            email: req.body.email,
            image:req.file.filename
        });
    }
    try {
        const result = prod.save();
        res.status(201).json({
            msg: "In Added successfully123",
            body: result,
            success: true
        })

    }
    catch (err) {
        res.status(400).json({
            msg: "Backend Error",
            body: err,
            success: false
        })
    }
}

exports.getAllUser = (req, res) => {
    console.log('mummy');
    Prod.find().then(result => {
        res.status(201).json({
            msg: "Users detail",
            body: result,
            success: true
        })
    }).catch(err => {
        res.status(400).json({
            msg: "Backend Error",
            body: err,
            success: false
        })
    })
}

exports.UpdateUser = (req, res, next) => {
    Prod.findByIdAndUpdate({ _id: req.body.id }, {
        companyName: req.body.companyName,
        price: req.body.price,
        email: req.body.email,
    }).then(data => {

        if (!data) {
            return res.status(404).send({
                message: "Note not found with id " + req.body.id
            });
        }

        res.status(201).json({
            message: 'update successfully' + req.body.id,
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.deleteUser = (req, res, next) => {
    console.log("xxxxxxxxxxxxxxxxxxx xxxxxxxx delete init " + req.params.id);
    Prod.findByIdAndRemove({ _id: req.params.id })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.status(201).json({
                message: 'Delete successfully',
            });
        }).catch(err => {
            console.log(err);
        });
}

exports.allDeleteUser = (req, res, next) => {

    Prod.deleteMany({ email: req.body.email, companyName: req.body.companyName })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.email + req.body.companyName
                });
            }
            res.status(201).json({
                message: 'Delete all successfully',
            });
        }).catch(err => {
            console.log(err);
        });
}



