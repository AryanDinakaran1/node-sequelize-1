const express = require('express')
const cors = require('cors')
const crypto = require('crypto')

const db = require('./models')
const { User } = require('./models')

app = express()
app.use(express.json())
app.use(cors())

db.sequelize.sync().then((res) => {
    app.listen(8000)
})

app.get('/hello-world', (req, res) => {
    res.status(200).json("hello_world")
})

app.get('/get-users', (req, res) => {
    User.findAll().then((users) => {
        res.status(200).json(users)
    }).catch(err => res.status(500).json("Error"))
})

app.get('/get-user/:id', (req, res) => {
    User.findAll({ where: { id: req.params.id } }).then((user) => {
        res.status(200).json(user[0])
    }).catch(err => res.status(500).json(err))
})

app.post('/create-user', (req, res) => {
    var pass = crypto.createHash('sha256').update(req.body.password).digest('base64')
    User.create({
        username: req.body.username,
        password: pass,
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})

app.put('update-user/:id', (req, res) => {
    var pass = crypto.createHash('sha256').update(req.body.password).digest('base64')
    User.update({
        username: req.body.username,
        password: pass,
    }, { where: {id: req.params.id} })
})

app.delete('/delete-user/:id', (req, res) => {
    User.destroy({ where: {id:req.params.id} })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err))
})