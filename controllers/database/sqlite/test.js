const { DatabaseSync } = require('node:sqlite')

const testConnection = function(){
    try {
        const db = new DatabaseSync(process.env.DB_URL)

        return 'SUCCESS. Connected to SQLITE DB.'
    } catch(err) {
        console.error(err)
        throw err
    }
}

module.exports = { testConnection }