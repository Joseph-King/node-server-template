const axios = require('axios')

const headers = {
    'Authorization': `Basic ${Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASS}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const testConnection = async function(){1
    return new Promise((resolve, reject) => {
        let axiosData = {
            headers: headers
        }

        axios.get(`${process.env.DB_URL}`, axiosData)
            .then((resp) => {
                resolve(`SUCCESS: Connected to DB: elasticsearch at ${process.env.DB_URL}`)
            })
            .catch((err) => {
                console.log(err);
                resolve(`ERROR: Cannot connect to DB: elasticsearch at ${process.env.DB_URL}`)
            });
    })
}

module.exports = { testConnection }