
const AuthPhis = require('./auth_phis')
const constants = require('../../utils/constans');
const PhisProject = require('../../db/model/phis_project')
const PhisGroup = require('../../db/model/phis_group')
const PhisExperiment = require('../../db/model/phis_experiment')
const IndividualsQueries = require('../../db/mapper/individuals_queries')
const axios = require('axios')



async function requestProject(headerToken) {
    const project = new PhisProject("AgMIP Test","AgMIP_"+1, " A project to load and group agmip experiments", '2015-05-20','2018-05-20')
    const url = constants.URL_PROJECT
    try {
        const response = await axios.post(url, [project],headerToken)
        
        const projectUri=response.data.metadata.datafiles[0]
        console.log(projectUri)
        return projectUri
    }
    catch(error){
      console.log("error ", error.response.data.metadata.status);
    }
}




async function  requestOrganization(headerToken, individuals) {
    
    const query= new IndividualsQueries()
    
    const institutionsList=query.getInstitutions(individuals)

    const institutionsListPhisFormat= institutionsList.map(
        (institutionLocal)=>{
            const group = new PhisGroup()
            group.populateFromMapper(institutionLocal)
            return group
        })

    //console.log(institutionsListPhisFormat)

    validateOrganization(headerToken,institutionsListPhisFormat)

    return {hi:'holas'}
    //similar to group in PHIS
     
    // const url = constants.URL_ORGANIZATION 
    // try {
    //     const response = await axios.post(url, institutionsListPhisFormat,headerToken)
    //     console.log("response groups", response.data.metadata)
    //     const uris= response.data.metadata.datafiles

    //     const irisCouple= institutionsList.map((item, index)=>{
    //         return {"iriLocal":item["iriLocal"], "iriRemote":uris[index]}
    //     })
    //     return irisCouple
    // }
    // catch(error){
    //   console.log("error ", error.response.data.metadata.status);
    // }
    // return null
}
async function requestExperiments(headerToken, individuals, projectURI) { 
    const query= new IndividualsQueries()
    const experimentsList=query.getExperiments(individuals)

    const experimentsListPhisFormat= experimentsList.map(
        (experiment)=>{
            const phisExperiment = new PhisExperiment(projectURI)
            phisExperiment.populateFromMapper(experiment)


            return phisExperiment
        })
    console.log(experimentsListPhisFormat)
    const url = constants.URL_EXPERIMENT 
    try {
        const response = await axios.post(url, experimentsListPhisFormat,headerToken)
        //console.log("response groups", response.data.metadata)
        const uris= response.data.metadata.datafiles

        const irisCouple= experimentsList.map((item, index)=>{
            return {"iriLocal":item["iriLocal"], "iriRemote":uris[index]}
        })
        return irisCouple
    }
    catch(error){
      console.log("error ", error.response.data.metadata.status);
    }
    return null
} 

class PhisRequester {


    constructor() { }

    setIndividuals(individuals) {
        this.individuals = individuals
    }
    async doRequest() {
        const authPhis = new AuthPhis()
        const token = await authPhis.getToken()
        const header= authPhis.getHeader()
        
        // create initial project every request is a new project
        const resultProject= await requestProject(header)

        const resultExperiments= await requestExperiments(header, this.individuals.individuals, resultProject )
        //step 1 request organizations
        //const resultOrganizationURIs = await requestOrganization(header,this.individuals.individuals)

        
        return resultExperiments
    }
}

module.exports = PhisRequester