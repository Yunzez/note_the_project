const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("this is router user")
})

router.route('/:id')
    .get((req, res) => {
        res.send(`user get id ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`update get id ${req.params.id}`)
    }).delete((req, res) => {
        res.send(`delete user get id ${req.params.id}`)
    })


module.exports = router;