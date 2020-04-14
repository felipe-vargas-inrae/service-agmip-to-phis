
import rootpath from 'rootpath'
import  dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import routePhisRequest from './routes/agmip_phis_request.router'
dotenv.config() // env file
rootpath() // set root path

import express, {Express} from "express";


// const cors = require('cors')
// const bodyParser = require('body-parser')
// const jwt = require('_helpers/jwt')
import errorHandler from './helpers/error_handler'

/**
 * open express app and instance web server
 */
class App {
    private _express: Express
    public get express(): Express {
        return this._express
    }
    public set express(value: Express) {
        this._express = value
    }

    constructor () {
      this.express = express()
      this.mountRoutes()
      this.parseBody()
    }

    // mounts the routes in the API
    private mountRoutes (): void {
        // api routes
        this.express.use('/agmip_phis_request',routePhisRequest );
        // global error handler
        this.express.use(errorHandler);
    }

    /**
     * for each axios request transform to json
     */
    private parseBody():void {

        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.express.use(cors());
    }
}



// start server
const app = new App().express
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port,  () =>{
    console.log('Server listening on port ' + port)
})


