import {OntologyFormatHelper} from '../mapper/mapper_classes_definitions/'



const formatDate= OntologyFormatHelper.formatDate
const removeLiteral= OntologyFormatHelper.removeLiteral
const isDateField = OntologyFormatHelper.isDateField

// const dates = ["startDate", "endDates"]

/**
 * Model to create and update experiments
 */
class PhisExperiment {

    private  startDate: string
    private  endDate: string
    private  field: string
    private  campaign: string
    private  place: string
    private  alias: string
    private  comment: string
    private  keywords: string
    private  objective: string
    private  cropSpecies: string
    private  projectsUris: string[]
    private  groupsUris: string[]
    // private  contacts: [ContactPostgreSQL]

    constructor(projectURI:string){
        this.projectsUris= [projectURI] // all the elements share the same project
    }

    /**
     * create the experiment instance from the mapper attribute
     * @param experimentMapper
     */
    populateFromMapper(experimentMapper):void{

        const properties= experimentMapper.dataProperties// array

        for (const x of Object.keys(properties)){
            const currentProperty= properties[x]
            const fieldName=removeLiteral(currentProperty.dataProperty)
            const value =  isDateField(fieldName)  ? formatDate(currentProperty.value) : currentProperty.value
            this[fieldName]=value
        }
        // this.alias = experimentMapper.dataProperties.find((item)=>{return item.dataProperty===icasa("exname") })
        // this.alias = this.alias.value
    }
}
export default PhisExperiment