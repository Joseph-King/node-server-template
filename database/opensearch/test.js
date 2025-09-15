const axios = require('axios')
const https = require('https')

const headers = {
    'Authorization': `Basic ${Buffer.from(`${process.env.DB_USER}:${process.env.DB_PASS}`).toString('base64')}`,
    'Content-Type': 'application/json'
}

const testConnection = async function(){
    return new Promise((resolve, reject) => {
        let axiosData = {
            headers: headers,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        }

        axios.get(`${process.env.DB_URL}`, axiosData)
            .then((resp) => {
                resolve(`SUCCESS: Connected to DB: opensearch at ${process.env.DB_URL}`)
            })
            .catch((err) => {
                console.log(err);
                resolve(`ERROR: Cannot connect to DB: opensearch at ${process.env.DB_URL}`)
            });
    })
}

module.exports = { testConnection }