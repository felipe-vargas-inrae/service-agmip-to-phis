import {OntologyFormatHelper} from '../mapper/mapper_classes_definitions/'
import { MapperEntity } from '../mapper/mapper_entities'


const icasa=OntologyFormatHelper.icasa()
const oepo=OntologyFormatHelper.oepo()
const rdfs=OntologyFormatHelper.rdfs()
const foaf=OntologyFormatHelper.foaf()

const formatDate= OntologyFormatHelper.formatDate
const removeLiteral= OntologyFormatHelper.removeLiteral
const isDateField = OntologyFormatHelper.isDateField

// const dates = ["startDate", "endDates"]
/*Array[ExperimentPostDTO {
    startDate (string, optional),
    endDate (string, optional),
    field (string, optional),
    campaign (string, optional),
    place (string, optional),
    alias (string, optional),
    comment (string, optional),
    keywords (string, optional),
    objective (string, optional),
    cropSpecies (string, optional),
    projectsUris (Array[string], optional),
    groupsUris (Array[string], optional),
    contacts (Array[ContactPostgreSQL], optional)
    }
    ContactPostgreSQL {
    email (string, optional),
    firstName (string, optional),
    familyName (string, optional),
    type (string, optional)
    }]
*/
/**
 * Model to create and update experiments
 */

 const DTO_MAP = {
    alias: oepo.alias
 }


class PhisExperimentDTO {

    private startDate: string
    private endDate: string
    private field: string
    private campaign: string
    private place: string
    private alias: string
    private comment: string
    private keywords: string
    private objective: string
    private cropSpecies: string
    private projectsUris: string[]
    private groupsUris: string[]
    // private  contacts: [ContactPostgreSQL]

    // constructor(){
    //     // this.projectsUris= [projectURI] // all the elements share the same project
    // }
    /**
     * create the experiment instance from the mapper attribute
     * @param experimentMapper
     */
    populateFromMapper(experimentMapper:MapperEntity):void{

        // const properties= experimentMapper.dataProperties// array
        this.alias = String(experimentMapper.getOneValueByDataProperty(oepo.alias))
        this.startDate="2018-01-01" // mandatory in PHIS but not in AgMIP
        this.endDate= "2019-01-01" // mandatory in PHIS but not in AgMIP
    }
}
export default PhisExperimentDTO