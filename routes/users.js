var express = require("express");
var router = express.Router();
var connection = require("../services/db");

/* GET users listing. */
router.post("/register", function(req, res, next) {
    var clientRequests = {
        email: req.body.email,
        password: req.body.password
    };

    var query = connection.query(
        "INSERT INTO users SET ?",
        clientRequests,
        (error, result, fields) => {
            if (error) throw error;
          req.session.userId = result.insertId
            res.redirect(301, "/current-user");
        }
    );
    // console.log(query.sql);
});

/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});

/* GET users listing. */
router.get("/:userId", function(req, res, next) {
    connection.query(
        "SELECT * FROM users WHERE id = ?",
        req.params.userId,
        (error, results, fields) => {
            if (error) throw error;
            var { id, email, isVerified } = results[0];
            //Sending user data without the pasword column
            res.json({ id, email, isVerified });
        }
    );
});

module.exports = router;
