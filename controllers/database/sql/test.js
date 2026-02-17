const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_URL)

const testConnection = async function(){
    return new Promise((resolve, reject) => {
        sequelize.authenticate()
            .then(() => {
                resolve('SUCCESS. Connected to SQL DB.')
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })
}

module.exports = { testConnection }