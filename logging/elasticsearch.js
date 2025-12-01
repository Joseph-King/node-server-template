const Log = require('./models/log');
const esTest = require('../database/elasticsearch/test')

const testConnection = async function(){
    return new Promise((resolve, reject) => {
        esTest.testConnection()
            .then(() => {
                resolve(`SUCCESS. Connected to LOGGER: ${process.env.LOGGER} at ${process.env.LOGGER_URL}`);
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = { testConnection }