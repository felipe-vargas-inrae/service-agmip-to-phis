
const JsonPhisModel = require('../db/model/json_phis.model')
const AgMipPhisMapper = require('../db/mapper/agmip_phis.mapper.js')
const PhisRequester = require('../services/agmip_phis_request/phis_requester')



const AgMipPhisRequestService={ 
    agmipToPhis:async (agmipJsonFilePath)=>{
        const jsonPhisModel= new JsonPhisModel(agmipJsonFilePath)
        const agMipPhisMapper= new AgMipPhisMapper()
        const phisRequester= new PhisRequester()
        
        
        // individuals to be send to requester
        const resultPhisFormat= agMipPhisMapper.compile(jsonPhisModel)

        // do the request based in individuals extracted
        phisRequester.setIndividuals(resultPhisFormat)
        const institutions= await phisRequester.doRequest()
        // console.log("service",institutions)
        return {
            //result:resultPhisFormat,
            institutions:institutions
        }
    }
}


module.exports=AgMipPhisRequestService;