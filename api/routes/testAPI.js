var express = require('express')
var router = express.Router();

router.get("/", function(req, res, next) {
    res.render('hello, testing');
    // send a server error with text
    // res.status(500).json({message: "Error"})

    // send a normal json
    // res.json({message: "Error"})

    // download a file
    // res.download("testAPI.js")
})

module.exports = router