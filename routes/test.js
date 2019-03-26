var express = require("express");
var route = express();
var connection = require('../services/db');

const {check, validationResult }  = require('express-validator/check')

route.post('/db',[
    check('name')
        .isLength({ min: 2 })
        .withMessage("Minimum 2 characters are required")
        .isLength({max: 10})
        .withMessage("The max length of name can only be upto 10 character"),

    // check('email')
    //     .isEmail()
    //     .withMessage("Email is not valid"),
    
    check('description')
        .isLength({ min: 2, max: 10 })
        .withMessage("please input a genuine description")

], function(req,res,next){
    //Checking the validation rules passes or not
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //Sending a Bad request and errors array to frontend
        res.status(422).json(errors.array());
    } else {
        var myObj = {
            name: req.body.name ,
            description: req.body.description,
            status: req.body.status || 1
        };
        
       connection.query("INSERT INTO items SET ?",myObj, function(error, results,fields){
        if(error) throw error;
           res.redirect(301, '/db/'+results.insertId);

        // res.json({
        //     data:{id: results.insertId, ...myObj},
        //     message: "Inserted new data"
        // });
        
       });
    }
});

route.get("/db", function(req, res, next) {
    connection.query("SELECT * FROM items", function(err, result, fields) {
        if (err) {
            throw errres.send(results);;
        }
        res.send(result);
    });
});

route.get("/db/:myRoute", function(req, res, next) {
    //Getting the dynamic name from the route
    var id = req.params.myRoute;
    connection.query("SELECT * FROM items WHERE id = ?", id, function(
        err,
        result,
        fields
    ) {
        if (err) {
            throw err;
        }
        
        res.send(result);
    });
});
route.get("/db-status/:status", function(req, res, next) {
    //Getting the dynamic name from the route
    var status = req.params.status;
    console.log(req.query);
    connection.query("SELECT * FROM items WHERE status = ?", status , function(
        err,
        result,
        fields
    ) {
        if (err) {
            throw err;
        }
        
        res.send(result);
    });
});

route.get("/test", function(req, res, next) {
    res.render("test", {
        title: "This is a test page",
        description: "This is just a dummy description"
    });
});

route.get("/another", function(req, res, next) {
    // res.send("Text can be sent by send");
    // res.json({ title: "This is a title"});
    res.render("test", {
        title: "Another page ",
        description: "This is another page"
    });
});

route.get("/json", function(req, res, next) {
    // res.send("Text can be sent by send");
    // res.json({ title: "This is a title"});
    res.json({
        title: "This is a test page",
        description: "This is just a dummy description"
    });
});

module.exports = route;
