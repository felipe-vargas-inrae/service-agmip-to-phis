import formidable from 'formidable';
import AgMipPhisRequestService from '../services/agmip_phis_request.service';


import {Response, Request} from "express"

/**
 * manage inputs and responses from web services
 */
class AgMipPhisRequestController{

    // get input file request form and call services
    index(req:Request, res:Response):void{
        const form = new formidable.IncomingForm();

        form.on('file', (field, file)=>{
            AgMipPhisRequestService.agmipToPhis(file.path).then((result)=>{
                console.log("inside controller ", result)
                res.json(result)
            })
        })
        // form.on('end', () => {
        //     //res.json()
        // })
        form.parse(req);
    }
}

export default new AgMipPhisRequestController()