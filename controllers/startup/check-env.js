const checkEnv = function(){
    for(let field in templateEnv){
        switch(field){
            case 'DB':
                checkDB()
                break
            case 'LOGGER':
                checkLOGGER()
                break
            case 'DASHBOARD':
                checkDASHBOARD()
                break
            case 'TIKA':
                checkTIKA()
                break
            case 'DB_AUTH':
            case 'DB_KEY':
            case 'DB_URL':
            case 'DB_SECRET':
            case 'DB_USER':
            case 'DB_PASS':
            case 'LOGGER_URL':
            case 'LOGGER_USER':
            case 'LOGGER_PASS':
                continue
            default:
                if(process.env[field]) continue

                process.env[field] = templateEnv[field]
        }
    }
}

const checkDB = function(){
    if(process.env.DB){
        switch(process.env.DB){
            case 'none':
                break
            case 'sql':
            case 'mongo':
            case 'sqlite':
                checkUrlDB()
                break
            case 'opensearch':
                checkBasicAuthReq('DB')
                break
            case 'dynamo':
                checkDynamoDB()
                break
            case 'elasticsearch':
                checkESDB()
                break
            default:
                terminateServer(`ERROR. ${process.env.DB} is not a valid value of environment variable "DB"`)
        }
    } else {
        console.log('WARNING. Environment variable "DB" not set. Setting to NONE')
        process.env.DB = 'none'
    }
}

const checkUrlDB = function(){
    if(process.env.DB_URL) return

    terminateServer(`ERROR. DB of type "${process.env.DB}" requires the environment variable DB_URL.`)
}

const checkDynamoDB = function(){
    if(process.env.DB_AUTH){
        if(process.env.DB_AUTH === 'local'){
            checkUrlDB()
        } else if(process.env.DB_AUTH === 'cloud'){
            let reqFields = ['_URL', '_KEY', '_SECRET']

            checkApiKeyReq('DB', reqFields)
        } else {
            terminateServer(`ERROR. ${process.env.DB_AUTH} is not a valid value of environment variable "DB_AUTH"`)
        }
    } else {
        terminateServer(`ERROR. DB of type "${process.env.DB}" requires the environment variable DB_AUTH.`)
    }
}

const checkESDB = function(){
    if(process.env.DB_AUTH){
        if(process.env.DB_AUTH === 'basic'){
            checkBasicAuthReq('DB')
        } else if(process.env.DB_AUTH === 'apiKey'){
            let reqFields = ['_URL', '_KEY']
            checkApiKeyReq('DB', reqFields)
        } else {
            terminateServer(`ERROR. ${process.env.DB_AUTH} is not a valid value of environment variable "DB_AUTH"`)
        }
    } else {
        terminateServer(`ERROR. DB of type "${process.env.DB}" requires the environment variable DB_AUTH.`)
    }
}

const checkBasicAuthReq = function(prefix){
    let reqFields = ['_URL', '_USER', '_PASS']

    for(let field of reqFields){
        let string = `${prefix}${field}`

        if(process.env[string]) continue

        terminateServer(`ERROR. ${prefix} with Basic Auth requires environment variable ${string}`)
    }
}

const checkApiKeyReq = function(prefix, reqFields){
    for(let field of reqFields){
        let string = `${prefix}${field}`

        if(process.env[string]) continue

        terminateServer(`ERROR. ${prefix} requires environment variable ${string}`)
    }
}

const checkLOGGER = function(){
    if(process.env.LOGGER){
        if(process.env.LOGGER === 'none') return
        checkBasicAuthReq('LOGGER')
    } else {
        console.log('WARNING. Environment variable "LOGGER" not set. Setting to NONE')
        process.env.LOGGER = 'none'
    }
}

const checkDASHBOARD = function(){
    if(process.env.DASHBOARD){
        if(process.env.DASHBOARD === 'none') return
        checkBasicAuthReq('DASHBOARD')
    } else {
        console.log('WARNING. Environment variable "DASHBOARD" not set. Setting to NONE')
        process.env.DASHBOARD = 'none'
    }
}

const checkTIKA = function(){
    if(process.env.TIKA){
        if(process.env.TIKA === 'disabled') return
        if(process.env.TIKA_URL) return

        terminateServer('ERROR. If TIKA is enabled environment variable TIKA_URL is required')
    } else {
        console.log('WARNING. Environment variable "TIKA" not set. Setting to DISABLED')
        process.env.TIKA = 'disabled'
    }
}

const terminateServer = function(message){
    console.log(message)
    console.log('Terminating Server')
    process.exit(1)
}


const templateEnv = {
    NODE_ENV: 'UNDEFINED',
    ENV: 'DEVELOPMENT',
    STARTUP: 'enabled',
    CORS: 'disabled',
    ALLOWED_ORIGINS:[],
    HTTP_PORT:3000,
    HTTPS_PORT:3443,
    HTTPS:'disabled',
    DB:'none',
    DB_AUTH:'',
    DB_KEY:'',
    DB_URL:'',
    DB_SECRET:'',
    DB_USER:'',
    DB_PASS:'',
    LOGGER:'none',
    LOGGER_AUTH:'',
    LOGGER_KEY:'',
    LOGGER_URL:'',
    LOGGER_USER:'',
    LOGGER_PASS:'',
    DASHBOARD:'none',
    DASHBOARD_URL:'',
    DASHBOARD_USER:'',
    DASHBOARD_PASS:'',
    TIKA:'disabled',
    TIKA_URL:''
}

module.exports = checkEnv