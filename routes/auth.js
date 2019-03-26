var express = require("express");
var router = express.Router();
var connection = require("../services/db");

//Middleware to catch auth
function requiresLogin(){

}

router.get('/session',(req,res,next)=>{
    res.send(req.session.userId);
})

/* GET users listing. */
router.get("/current-user", function (req, res, next) {
    var currentUser = req.session.userId;
    if(!currentUser){
        return res.status(401).send("Please login to view this page")
    } 
    connection.query(
        "SELECT * FROM users WHERE id = ?",
        currentUser,
        (error, results, fields) => {
            if (error) res.status(401).send("Error while fetching from db");
            console.log(results);
            var { id, email, isVerified } = results[0];
            //Sending user data without the pasword column
            res.json({ id, email, isVerified });
        }
    );
});

/* GET users listing. */
router.post("/login", function(req, res, next) {
    //Fetching the user input values
    var credentials = {
        email: req.body.email,
        password: req.body.password
    };
    connection.query(
        "SELECT * FROM users WHERE email=? AND password=?",
        [credentials.email, credentials.password],
        (error, results, fields) => {
            if (error) throw error;
            req.session.userId = results[0].id;

            //Sending user data without the pasword column
             res.redirect(301, '/current-users');
        }
    );
});

router.get('/protected',(req,res,next)=>{
    res.send("This is a protected route available after authentication");
});

module.exports = router;