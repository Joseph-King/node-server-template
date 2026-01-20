const dynamoose = require('dynamoose')

const testConnection = async function(){
    return new Promise((resolve, reject) => {
        
        if(process.env.DB_AUTH === 'local'){
            testLocal()
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        } else {
            testCloud()
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        }
    })
}

const testLocal = async function(){
    return new Promise((resolve) => {
        try{
            dynamoose.aws.ddb.local()
            resolve(`SUCCESS: Connected to DB: ${process.env.DB} at ${process.env.DB_URL}`)
        } catch(err){
            console.error(err)
            resolve(`ERROR: Cannot connect to DB: ${process.env.DB} at ${process.env.DB_URL}`)
        }
    })
}

const testCloud = async function(){
    return new Promise((resolve) => {
        try{
            const ddb = new dynamoose.aws.ddb.DynamoDB({
                "credentials": {
                    accessKeyId: process.env.DB_KEY,
                    secretAccessKey: process.env.DB_SECRET
                },
                "region": process.env.DB_URL
            })

            dynamoose.aws.ddb.set(ddb)
            resolve(`SUCCESS: Connected to DB: ${process.env.DB} at ${process.env.DB_URL}`)
        } catch(err){
            console.error(err)
            resolve(`ERROR: Cannot connect to DB: ${process.env.DB} at ${process.env.DB_URL}`)
        }
    })
}

module.exports = { testConnection }