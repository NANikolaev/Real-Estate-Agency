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
                house.notRent = house.owner != req.user.id && !isRented && house.pieces > house.rentedUsers.length
                house.isRented = house.owner != req.user.id && isRented
                house.isFull = house.rentedUsers.length == house.pieces
            }
            return house
        })
}

module.exports = {
    getAll,
    create,
    details
}