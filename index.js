const express = require('express')
const path = require('path')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

//Importing ENV
try {
    require('dotenv').config({ path: `./environment/${process.env.NODE_ENV}.env`})
} catch(err) {
    console.error(err)
    console.log('ERROR: Could not use environment file.')
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
    if(process.env.CORS === 'enabled'){
        const corsOptions = {
            origin: (origin, callback) => {
                if(process.env.ALLOWED_ORIGINS.indexOf(origin) !== -1){
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
    console.log(`SUCCESS: Database set to ${process.env.DB}.`);
} catch(err){
    console.error(err)
	console.log(`ERROR: Cannot set Database to target ${process.env.DB}.`)
}

//Logging
try {
	var logger = require(`./logging/${process.env.LOGGER}`);
	console.log(`SUCCESS: Logger set to ${process.env.LOGGER}`);
} catch(err){
    console.error(err)
	console.log(`ERROR. Cannot set LOGGER to target ${process.env.LOGGER}`);
	var logger = require(`./backend/logging/none`);
}

//Serving Frontend
try {
    app.use(express.static(path.join(__dirname, 'public')))
} catch(err) {
    console.error(err)
    console.log('ERROR: Could not server frontend.')
}

//Endpoints
const testEndpoints = require('./endpoints/test-endpoints')

//Serving Backend
try {
    if(process.env.HTTPS === 'enabled'){
        const sslServer = https.createServer({
            key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
            cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
        }, app)

        sslServer.listen(process.env.HTTPS_PORT, (err) => {
            if(!err){
                console.log(`${process.env.NODE_ENV} Server is running in ${process.env.ENV} mode. Using HTTPS on port: ${process.env.HTTPS_PORT}.`)
            } else {
                console.error(err)
                console.log('ERROR: Server could not be served over HTTPS.')
            }
        })
    } else {
        app.listen(process.env.HTTP_PORT, (err) => {
            if(!err){
                console.log(`${process.env.NODE_ENV} Server is running in ${process.env.ENV} mode. Using HTTP on port: ${process.env.HTTP_PORT}.`)
            } else {
                console.error(err)
                console.log('ERROR: Server could not be served over HTTP.')
            }
                
        })
    }
} catch(err) {
    console.error(err)
    console.log("ERROR: Could not initialize server.")
}

//STARTUP SCRIPTS
try {
    const startup = require('./startup/start')
    if(process.env.STARTUP === 'enabled'){
        setTimeout(() => {
            startup.entry()
        }, 500)
    }
} catch(err) {
    console.error(err)
    console.log('ERROR: Issue occurred while attempting to run startup scripts.')
}