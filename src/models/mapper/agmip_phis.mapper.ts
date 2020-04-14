
import {ClassItemMap, ClassItemIriMap, DataPropertyItemMap,
    PropertyItemMap, OntologyFormatHelper} from './mapper_classes_definitions'

import {MapperEntity, MapperEntityDataProperty, MapperEntityObjectProperty, IndividualsRequest} from './mapper_entities'
import JsonScanAgMIP from '../entities/json_scan_agmip'
import MapperRules from './mapper_rules'


const uriGenerator = OntologyFormatHelper.uriGenerator

/**
 * based on a classItemMap and an array of data properties filter those that involve the item
 * @param classReference
 * @param propertiesList
 */
const getDataPropertiesByClass=(classReference:ClassItemMap,propertiesList:DataPropertyItemMap[]):DataPropertyItemMap[]=>{
    return propertiesList.filter((property)=>{
        return property.classItemMapA===classReference
    })
}

/**
 * based on the definitions for classes, instance all the mapper entities relates to those rules with a localUri
 * @param classItem
 * @param dataProperties
 * @param jsonFileManager
 */
const processClass=(classItem: ClassItemMap|ClassItemIriMap ,
     dataProperties:DataPropertyItemMap[],
     jsonFileManager: JsonScanAgMIP):MapperEntity[]=>{
    console.log(classItem)
    const className=classItem.className
    const jsonPath=classItem.path

    const hasURI= classItem instanceof ClassItemIriMap
    // const elements=jsonFileManager.getPath(jsonPath)
    const allPaths=allPosiblesPaths(jsonPath, jsonFileManager)
    const dataPropertiesClass= getDataPropertiesByClass(classItem,dataProperties)
    let relativePathURI=null
    if(hasURI){
        const classItemIri =  classItem as ClassItemIriMap
        relativePathURI=classItemIri.iri.replace(jsonPath,'$')
    }
    const mapElements= allPaths.map((elem: any,i: any)=>{

        let iriValue= null
        if(relativePathURI){
            iriValue= jsonFileManager.getPathFirstElement(relativePathURI.replace('$',elem))
        }
        const mapEntiity= new MapperEntity(
            uriGenerator(className,iriValue),
            null,
            className,
            elem,
            processDataProperties(dataPropertiesClass,elem,jsonFileManager)
        )
        return mapEntiity
    })
    // console.log("map elements", mapElements)

    return mapElements
}



/**
 * based on the definitions for dataProperties, instance all the mapper entities relates to those rules with a localUri
 * @param {Array} propertiesList is a list of properties that belong an specific class
 * @param {String} indexPath is a position representing location for an individual in the json path. For example '$.experiment[indexPath]'
 * @param {JsonScanAgMIP} jsonFileManager is a object class to manipulate json agmip
 */
const processDataProperties=(dataPropertiesList: DataPropertyItemMap[], exacPathOwner: string, jsonFileManager: JsonScanAgMIP):MapperEntityDataProperty[]=>{

    return dataPropertiesList.map((property)=>{
        const valuePath = property.valuePath
        const classItemMapA = property.classItemMapA
        const propertyName=property.propertyName

        // case 1 child value
        let valueProperty=null
        if(valuePath.includes(classItemMapA.path)){
            const exactPathValue=valuePath.replace(classItemMapA.path,'$').replace('$',exacPathOwner)
            valueProperty=jsonFileManager.getPath(exactPathValue)
        }
        if(jsonFileManager.hasResponse(valueProperty)){
            return new MapperEntityDataProperty(propertyName, valueProperty)
        }
        else return new MapperEntityDataProperty(propertyName, null)
    })
}

/**
 * based on the definitions for objectProperties, instance all the mapper entities relates to those rules with a localUri
 * @param property
 * @param allIndividuals
 */
const processObjectProperty=(property:PropertyItemMap, allIndividuals:MapperEntity[]):MapperEntityObjectProperty[]=>{
    // A relation to B
    const propertyName= property.propertyName
    const classA= property.classItemMapA
    const classB= property.classItemMapB

    const allIndividualsA= allIndividuals.filter((individual)=>{
        return individual.isA===classA.className
    })

    const allIndividualsB= allIndividuals.filter((individual)=>{
        return individual.isA===classB.className
    })

    const objectPropertiesList=[]
    for (const currentIndividualClassA of allIndividualsA){

        const pathClassA= currentIndividualClassA.exactPath

        const foundIndividual = allIndividualsB.find((individual) =>{
            return individual.exactPath.includes(pathClassA)
        });

        if(foundIndividual){

            const objectProperty = new MapperEntityObjectProperty(propertyName,currentIndividualClassA.iriLocal,foundIndividual.iriLocal)
            objectPropertiesList.push(objectProperty)
        }
    }

    return objectPropertiesList
}

const ARRAY_SYMBOL_JSONPATH= "[*]"
/**
 * get the substring after remove the array symbol of jsonpath language [*]
 * @param path
 */
const getSubPath=(path: string):string=>{
    const POSITION_POINT=3
    const position= path.indexOf(ARRAY_SYMBOL_JSONPATH)
    return path.substring(0, position + POSITION_POINT )
}
/**
 * based on an integer return the json path array string position
 * @param i
 */
const getArrayPostJsonPath=(i:number):string=>{
    return ARRAY_SYMBOL_JSONPATH.replace('*', String(i))
}


const allPosiblesPaths=(path: string, jsonFileManager: JsonScanAgMIP):string[]=>{
    if( path.includes(ARRAY_SYMBOL_JSONPATH)){// it has an array in their route
        const pathSize=jsonFileManager.getPathSize(getSubPath(path))
        let temporalPathList=[]
        for(let i = 0; i< pathSize;i++){
            const newPath = path.replace(ARRAY_SYMBOL_JSONPATH,getArrayPostJsonPath(i))
            const recursive = allPosiblesPaths(newPath,jsonFileManager)
            temporalPathList=temporalPathList.concat(recursive)
        }
        return temporalPathList
    }else {
        return [path]
    }
}

/**
 * as some elements are embeded on items they could be created several time, here are eliminated elements with the same URI
 */
const removeDuplicates= (objectList: MapperEntity[],accumulatedList: MapperEntity[]):MapperEntity[]=>{

    if (objectList.length===0) return accumulatedList
    else {
        // _oesoGroup_riviere_sebastien
        const currentIndividual=objectList.pop()
        accumulatedList.push(currentIndividual)

        const newList=  objectList.filter((item)=>{
            const newLocal = "iriLocal"
            return currentIndividual[newLocal]!== item[newLocal]
        })
        return removeDuplicates( newList, accumulatedList )
    }
}


class AgMipPhisMapper {

    /**
     * based on the agmip json file and the declare rules create a json ready to be request
     * @param jsonFileManager is a JsonPhis instance used to manipulate the agmip json file
     */
    compile(jsonFileManager: JsonScanAgMIP){
        const rules= MapperRules.getRules()

        let allIndividuals=[]
        // process classes from item definitions for each clases data properties will be added

        for(const currentClass of rules.classes){
            const classIndividuals=processClass(currentClass, rules.dataProperties,jsonFileManager)
            console.log(classIndividuals)
            allIndividuals=allIndividuals.concat(classIndividuals)
        }

        console.log("all individuals", allIndividuals)

        let objectProperties =[]
        //  process object properties after created all the classes individuals
        for (const currentObjectProperty of rules.objectProperties){
            objectProperties=objectProperties.concat(processObjectProperty(currentObjectProperty,allIndividuals))
        }

        // const objectPropertiesFlatten= flatten(objectProperties)

        const cleanedIndividuals= removeDuplicates(allIndividuals,[])
        return new IndividualsRequest(
            cleanedIndividuals,objectProperties)
    }
}

export default AgMipPhisMapper