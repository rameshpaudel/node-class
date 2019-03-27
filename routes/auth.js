var express = require("express");
var router = express.Router();
var connection = require("../services/db");

//Middleware to catch auth
function requiresLogin(req,res,next){
    if(!req.session.userId){
        return res.status(401).send("Please login to view this page");
    }
    next()
}

router.get('/session',requiresLogin,(req,res,next)=>{
    res.send(req.session);
})

/* GET users listing. */
router.get("/current-user",requiresLogin, function (req, res, next) {
    var currentUser = req.session.userId;
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
             res.redirect(301, '/current-user');
        }
    );
});

router.get('/protected',(req,res,next)=>{
    res.send("This is a protected route available after authentication");
});

module.exports = router;
