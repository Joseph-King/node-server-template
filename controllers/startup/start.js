const testConnections = require('./test-connections')

const entry = async function(){
    console.log('SUCCESS: Running Startup Scripts')

    //STARTUP CONNECTIONS
    try {
        let connectionResp = await testConnections()
    } catch(err) {
        console.log(err)
        console.log('ERROR: Failed to run startup scripts.')
    }
}

module.exports = { entry }