const getUserData = require('../auth/hybrid-functions/getUserData');

const Log = require('./models/log');

const testConnection = async function(){
    return `N/A. LOGGER: ${process.env.LOGGER}, no need to test. Will display logs in console`
}

const logEndpoint = async function(status, req, userData){
    // if(userData === undefined)
    //     userData = await getUserData(req)

    let log = new Log(
        status,
        req.method,
        req.originalUrl,
        req.params,
        req.headers,
        userData ? userData.user : undefined
    )

    console.log(log)

    return log
}

module.exports = { testConnection, logEndpoint };