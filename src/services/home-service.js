const User = require('../models/User');
const secret = require('../configurations/secret');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Estate = require('../models/Estate');

function register(req, res,) {
    if (req.body.password != req.body.repeatPassword) {
        throw new Error('Password dont match')
    }
    return User.create(req.body)
        .then(user => {
            let payload = {
                username: user.username,
                id: user._id
            }
            let accessToken = jwt.sign(payload, secret, { expiresIn: '1d' })
            return accessToken
        })

}

function login(req, res) {
    return User.findOne({ username: req.body.username })
        .then(user => {
            if (!req.body.username || !req.body.password) { throw new Error('Missed Fileds') }
            if (!user) { throw new Error("Invalid Username") }
            let validUser = bcrypt.compareSync(req.body.password, user.password)
            if (!validUser) { throw new Error("Invalid Password") }

            let payload = {
                username: user.username,
                id: user._id
            }
            let accessToken = jwt.sign(payload, secret, { expiresIn: '1d' })
            return accessToken
        })

}

function last3() {
    return Estate.find({}).lean()
        .then(all => {
            if (all.length <= 3) {
                return all
            }
            return all.slice(all.length - 3)
        })
}

function search(req, res) {
    let search = req.body.type
    return Estate.find({ type: search }).lean()
        .then(arr => {
            res.locals.search = true
            return arr
        })
}

module.exports = {
    register,
    login,
    last3,
    search
}