const testConnection = async function(){
    return new Promise((resolve, reject) => {
        resolve(`N/A: No DB to connect to`)
    })
}

module.exports = { testConnection }