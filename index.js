const express       = require('express')
const path          = require('node:path')
const cors          = require('cors')
const https         = require('node:https')
const fs            = require('node:fs')
const bodyParser    = require('body-parser')

const app = express()

//Importing ENV
try {
    require('dotenv').config({ path: `./environment/${process.env.NODE_ENV}.env`})
} catch(err) {
    console.error(err)
    console.log('ERROR: Could not use environment file.')
}
try {
    const checkEnv = require('./controllers/startup/check-env')
    checkEnv()
} catch(err) {
    console.error(err)
    console.log('ERROR: Could not check env.')
}

//Body Parsers
try {
    app.use(bodyParser.json({ limit: '50mb' }))
} catch(err) {
    console.error(err)
    console.log('ERROR: Could not apply body parsers.')
}

//CORS
try {
    if(process.env.CORS && process.env.CORS === 'enabled' && process.env.ALLOWED_ORIGINS){
        const corsOptions = {
            origin: (origin, callback) => {
                if(process.env.ALLOWED_ORIGINS.includes(origin)){
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS.'))
                }
            },
            optionsSuccessStatus: 204
        }

        app.use(cors(corsOptions))
    } else {
        app.use(cors())
    }
} catch(err) {
    console.error(err)
    console.log('ERROR: Could not resolve CORS initialization.')
}

//Database
try {
    if(process.env.DB){
        require(`./controllers/database/${process.env.DB}/test`)
        console.log(`SUCCESS: Database set to ${process.env.DB}.`)
    } else {
        process.env.DB = 'none'
        console.log(`WARNING: DB is UNDEFINED`)
    }
} catch(err){
    console.error(err)
	console.log(`ERROR: Cannot set Database to target ${process.env.DB}.`)
}

//Logging
let logger
try {
	logger = require(`./controllers/logging/${process.env.LOGGER}`)
	console.log(`SUCCESS: Logger set to ${process.env.LOGGER}`)
} catch(err){
    console.error(err)
	console.log(`ERROR. Cannot set LOGGER to target ${process.env.LOGGER}`)
	logger = require(`./controllers/logging/none`)
}

//Routes
require('./routes/test-routes')(app, logger)

//Serving Backend
try {
    if(process.env.HTTPS && process.env.HTTPS === 'enabled'){
        const sslServer = https.createServer({
            key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
        }, app)

        sslServer.listen(process.env.HTTPS_PORT ? process.env.HTTPS_PORT : 3443, (err) => {
            if(err){
                console.error(err)
                console.log('ERROR: Server could not be served over HTTPS.')
            } else {
                console.log(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'UNDEFINED'} Server is running in ${process.env.ENV ? process.env.ENV : 'UNDEFINED'} mode. Using HTTPS on port: ${process.env.HTTPS_PORT ? process.env.HTTPS_PORT : '3443'}`)
            }
        })
    } else {
        app.listen(process.env.HTTP_PORT ? process.env.HTTP_PORT : 3000, (err) => {
            if(err){
                console.error(err)
                console.log('ERROR: Server could not be served over HTTP.')
            } else {
                console.log(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'UNDEFINED'} Server is running in ${process.env.ENV ? process.env.ENV : 'UNDEFINED'} mode. Using HTTP on port: ${process.env.HTTP_PORT ? process.env.HTTP_PORT : '3000'}.`)
            }
                
        })
    }
} catch(err) {
    console.error(err)
    console.log("ERROR: Could not initialize server.")
}

//STARTUP SCRIPTS
try {
    const startup = require('./controllers/startup/start')
    if(process.env.STARTUP === 'enabled'){
        setTimeout(() => {
            startup.entry()
        }, 500)
    }
} catch(err) {
    console.error(err)
    console.log('ERROR: Issue occurred while attempting to run startup scripts.')
}