const { Client } = require('@elastic/elasticsearch')

const getClient = function(){
    try {
        let auth = {}
        if(process.env.DB_AUTH === 'basic'){
            auth['username'] = process.env.DB_USER
            auth['password'] = process.env.DB_PASS
        } else {
            auth['apiKey'] = process.env.DB_KEY
            
        }

        const client = new Client({
            node: process.env.DB_URL,
            auth: auth
        })

        return client
    } catch(err) {
        console.error(err)
        return undefined
    }
}

module.exports = getClient