
import {OntologyFormatHelper} from '../mapper/mapper_classes_definitions/'
const icasa = OntologyFormatHelper.icasa
const oeso = OntologyFormatHelper.oepo()

class PhisGroup {
    // Array[GroupPostDTO {
    //     name (string, optional),
    //     level (string, optional),
    //     description (string, optional),
    //     usersEmails (Array[string], optional)
    // }]

    private name:string
    private description:string
    private level:string
    populateFromMapper(institutionMapper):void{
        const objectName = institutionMapper.dataProperties.find((item)=>{return item.dataProperty===oeso.name })
        this.name = objectName.value
        this.description = "my description"
        this.level = "Owner"
    }
}


export default PhisGroup