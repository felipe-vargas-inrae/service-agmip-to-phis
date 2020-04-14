

import {OntologyFormatHelper} from '../mapper_classes_definitions/'
import {MapperEntity, MapperEntityObjectProperty} from './'

const institutionClass = OntologyFormatHelper.institucionClass()
const experimentClass = OntologyFormatHelper.experimentClass()

const getClassIndividuals=(individuals: MapperEntity[], isA: string)=>{
    const result = individuals.filter((item)=>{
        return item.isA===isA
    })
    return result
}
class IndividualsRequest{

    private _individuals: MapperEntity[]
    private _objectProperties: MapperEntityObjectProperty[]
    public get individuals(): MapperEntity[] {
        return this._individuals
    }
    public set individuals(value: MapperEntity[]) {
        this._individuals = value
    }
    public get objectProperties(): MapperEntityObjectProperty[] {
        return this._objectProperties
    }
    public set objectProperties(value: MapperEntityObjectProperty[]) {
        this._objectProperties = value
    }

    constructor (individuals: MapperEntity[], objectProperties: MapperEntityObjectProperty[]){
        this.individuals=individuals
        this.objectProperties= objectProperties
    }


    getInstitutions(individuals: MapperEntity[]){
        return getClassIndividuals(individuals, institutionClass)
    }

    getExperiments(individuals: MapperEntity[]){
        return getClassIndividuals(individuals, experimentClass)
    }

    updateRemoteIri(listMatchsIrisLocalRemote: any[], individuals:MapperEntity[]){
        console.log(listMatchsIrisLocalRemote)
        for (const individual of  individuals) {

            const matchIris= listMatchsIrisLocalRemote.find((item)=>{
                const key = "iriLocal"
                return item[key]===individual.iriLocal
            })
            if (matchIris){
                const key = "iriRemote"
                individual.iriRemote= matchIris[key]
            }
        }
    }
}

export default IndividualsRequest