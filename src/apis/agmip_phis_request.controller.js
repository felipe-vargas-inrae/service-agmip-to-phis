const formidable = require('formidable');
const AgMipPhisRequestService = require('../services/agmip_phis_request.service')

exports.index= (req, res)=>{
    
    var form = new formidable.IncomingForm();

    form.on('file', (field, file)=>{
           

        AgMipPhisRequestService.agmipToPhis(file.path).then((result)=>{
            console.log("inside controller ", result)
            res.json(result) 
        })
        
         
    })
    form.on('end', () => {
        //res.json()
    })

    
    form.parse(req);
}
