const mongoose = require('mongoose')

const testConnection = async function(){
    return new Promise((resolve, reject) => {
        mongoose.connect(`${process.env.DB_URL}`)
            .then(() => {
                resolve(`SUCCESS: Connected to DB: ${process.env.DB} at ${process.env.DB_URL}`)
            })
            .catch((err) => {
                console.error(err);
                resolve(`ERROR: Cannot connect to DB: ${process.env.DB} at ${process.env.DB_URL}`)
            })
    })
}

module.exports = { testConnection }