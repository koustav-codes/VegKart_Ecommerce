const createError = require('http-errors');


const getUsers = (req, res, next) => {
    try {
       res.status(200).send({
            message: "Users Profile were returned",
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {getUsers}