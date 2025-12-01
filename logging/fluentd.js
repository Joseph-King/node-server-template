const axios = require('axios');

const getUserData = require('../auth/hybrid-functions/getUserData');

const Log = require('./models/log');

const headers = undefined;

const testConnection = async function(){
    return new Promise((resolve) => {
        setTimeout(() => {
            axios.get(process.env.LOGGER_URL, headers)
                .then(() => {
                    resolve(`SUCCESS. Connected to LOGGER: ${process.env.LOGGER} at ${process.env.LOGGER_URL}`);
                })
                .catch((err) => {
                    console.log(err);
                    resolve(`ERROR. Cannot connect to LOGGER: ${process.env.LOGGER} at ${process.env.LOGGER_URL}`);
                })
        }, 500)
    })
}

module.exports = { testConnection };