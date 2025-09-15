const dbTest = require(`../database/${process.env.DB}/test`)

module.exports = async function(){
    let result = {
        successfulConnections: [],
        failedConnections: []
    }

    //DB
    try {
        let dbRes = await dbTest.testConnection()
        console.log(dbRes)

        if(dbRes.startsWith('N/A') || dbRes.startsWith('SUCCESS')){
            result.successfulConnections.push('db')
        } else {
            result.failedConnections.push('db')
        }
    } catch(err) {
        result.failedConnections.push('db')

        console.error(err)
        console.log('ERROR: DB failed connection test')
    }

    return result
}