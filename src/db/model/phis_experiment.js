const OntologiesNames= require('../mapper/ontologies_names')
const icasa = OntologiesNames.icasa
const oeso = OntologiesNames.oeso


const dates = ["startDate", "endDates"]


const formatDate = (dateStr)=>{
 //var st = "26.04.2013";
 var pattern = /(\d{4})(\d{2})(\d{2})/;
 var dt = dateStr.replace(pattern,'$1-$2-$3');
 return dt
}

const removeLiteral=(owlStr)=>{
    return owlStr.split(':')[1]
}


class PhisExperiment {
    
    
    // Array[ExperimentPostDTO {
    //     startDate (string, optional),
    //     endDate (string, optional),
    //     field (string, optional),
    //     campaign (string, optional),
    //     place (string, optional),
    //     alias (string, optional),
    //     comment (string, optional),
    //     keywords (string, optional),
    //     objective (string, optional),
    //     cropSpecies (string, optional),
    //     projectsUris (Array[string], optional),
    //     groupsUris (Array[string], optional),
    //     contacts (Array[ContactPostgreSQL], optional)
    //     }

    constructor(projectURI){
        this.projectsUris= [projectURI]
    }

    populateFromMapper(experimentMapper){

        const properties= experimentMapper.dataProperties// array 

        for (const x in properties){
            const currentProperty= properties[x]
            const fieldName=removeLiteral(currentProperty.dataProperty)
            
            const value =  fieldName.toLowerCase().includes('date') ? formatDate(currentProperty.value) : currentProperty.value
            this[fieldName]=value
        }
        
        //this.alias = experimentMapper.dataProperties.find((item)=>{return item.dataProperty===icasa("exname") })
        //this.alias = this.alias.value
    }
}
module.exports= PhisExperiment