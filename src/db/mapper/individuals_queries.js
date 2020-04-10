
const ICASA_PREFIX="icasa:"
const OESO_PREFIX="oeso:"

const icasa=(name)=>{
    return ICASA_PREFIX+name
}
const oeso=(name)=>{
    return OESO_PREFIX+name
}

const institutions= oeso("Group")
const experiments= oeso("Experiment")


const getClassIndividuals=(individuals, isA)=>{

    const result = individuals.filter((item)=>{
        return item["isA"]===isA
    })
    return result
}
class IndividualsQueries{

    getInstitutions(individuals){
        return getClassIndividuals(individuals, institutions)
    }

    getExperiments(individuals){
        return getClassIndividuals(individuals, experiments)
    }

    updateRemoteIri(listObjects, individuals){

        for (var i in individuals) {

            const myIndividual= listObjects.find((item)=>{
                item["iriLocal"]
            }) 
            if (individuals[i]["iriLocal"] == value) {
               projects[i].desc = desc;
               break; //Stop this loop, we found it!
            }
          }
    }

}

module.exports=IndividualsQueries