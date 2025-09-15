const pg = require('pg')

const testConnection = async function(){
    return new Promise(async (resolve, reject) => {
        try {
            const client = new pg.Client({
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                database: process.env.DB_NAME
            })

            await client.connect()
            await client.end()
            resolve('SUCCESS. Connected to PotsgreSQL.')
        } catch(err) {
            console.error(err)
            reject(err)
        }
    })
}

module.exports = { testConnection }