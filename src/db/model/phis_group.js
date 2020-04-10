
const OntologiesNames= require('../mapper/ontologies_names')
const icasa = OntologiesNames.icasa
const oeso = OntologiesNames.oeso

class PhisGroup {
    
    
    // Array[GroupPostDTO {
    //     name (string, optional),
    //     level (string, optional),
    //     description (string, optional),
    //     usersEmails (Array[string], optional)
    // }]

    populateFromMapper(institutionMapper){
        
        this.name = institutionMapper.dataProperties.find((item)=>{return item.dataProperty===oeso("name") })

        this.name = this.name.value
        this.description = "my description"
        this.level = "Owner"
    }
}
module.exports= PhisGroup