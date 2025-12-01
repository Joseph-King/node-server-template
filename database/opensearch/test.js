const getClient = require('./getClient')

const testConnection = async function(){
    return new Promise((resolve, reject) => {
        const client = getClient()
        if(client === undefined){
            reject(new Error('ERROR. Client UNDEFINED'))
            return
        }

        client.info()
            .then(() => {
                resolve('SUCCESS. Connected to OpenSearch DB.')
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = { testConnection }