
import JsonPhisModel from '../models/entities/json_scan_agmip'
import AgMipPhisMapper from '../models/mapper/agmip_phis.mapper.js'
// import PhisRequester from '../services/agmip_phis_request/phis_requester'

class  AgMipPhisRequestService {
    async agmipToPhis (agmipJsonFilePath:string){
        const jsonPhisModel= new JsonPhisModel(agmipJsonFilePath)
        const agMipPhisMapper= new AgMipPhisMapper()
        // const phisRequester= new PhisRequester()
        // individuals to be send to requester
        const resultPhisFormat= agMipPhisMapper.compile(jsonPhisModel)

        // do the request based in individuals extracted
        // phisRequester.setIndividuals(resultPhisFormat)
        // const institutionsTest= await phisRequester.doRequest()
        // console.log("service",institutions)
        return {
            result:resultPhisFormat
            // institutions:institutionsTest
        }
    }
}

export default new AgMipPhisRequestService()