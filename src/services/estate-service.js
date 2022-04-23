const Estate = require('../models/Estate');

function getAll(req, res) {
    return Estate.find().lean()
}

function create(req, res) {
    req.body.owner = req.user.id
    return Estate.create(req.body)
}

function details(req, res) {
    return Estate.findById(req.params.id).populate('rentedUsers').lean()
        .then(house => {
            house.rentedNames = house.rentedUsers.map(u => u.name).join(", ")
            if (req.user) {
                let isRented = house.rentedUsers.find(u => u._id == req.user.id)
                house.isOwner = house.owner == req.user.id
                house.notRent = house.owner != req.user.id && !isRented && house.pieces > 0
                house.isRented = house.owner != req.user.id && isRented
                house.isFull = house.pieces == 0 && house.owner != req.user.id
            }
            return house
        })
}

function rent(req, res) {
    return Estate.findById(req.params.id).lean()
        .then(house => {
            house.rentedUsers.push(req.user.id)
            house.pieces = house.pieces - 1
            return Estate.findByIdAndUpdate(req.params.id, house)
        })
}

function removeHouse(req, res) {
    return Estate.findByIdAndDelete(req.params.id)
}

function getOne(req, res) {
    return Estate.findById(req.params.id).lean()
}

function edit(req, res) {
    let emptyFields = Array.from(Object.values(req.body)).includes('') == true
    let isUrl = req.body.image.startsWith('http') == true
            if (emptyFields) {
                throw new Error('Missed Field/s')
            }
            if(!isUrl){
                throw new Error('Invalid Url')
            }
            return Estate.findByIdAndUpdate(req.params.id,req.body)     
}

module.exports = {
    getAll,
    create,
    details,
    rent,
    removeHouse,
    getOne,
    edit
}