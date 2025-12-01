const { Client } = require('@opensearch-project/opensearch')

const getClient = function(){
    try {
        const client = new Client({
            node: process.env.DB_URL,
            auth: {
                username: process.env.DB_USER,
                password: process.env.DB_PASS
            },
            ssl: {
                rejectUnauthorized: false
            }
        })

        return client
    } catch(err) {
        console.error(err)
        return undefined
    }
}

module.exports = getClient