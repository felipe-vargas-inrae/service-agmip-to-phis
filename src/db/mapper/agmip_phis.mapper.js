
const uuidv1 = require('uuid/v1')
const factory = require ('./mapper_classes.js')
const ClassItemMap = factory.ClassItemMap
const ClassItemIRIMap= factory.ClassItemIRIMap
const PropertyItemMap=factory.PropertyItemMap
const DataPropertyItemMap=factory.DataPropertyItemMap

const ICASA_PREFIX="icasa:"
const OESO_PREFIX="oeso:"
const RDFS_PREFIX="rdfs:"

const icasa=(name)=>{
    return ICASA_PREFIX+name
}
const oeso=(name)=>{
    return OESO_PREFIX+name
}
const rdfs=(name)=>{
    return RDFS_PREFIX+name
}
const uriGenerator = (ontologyClass, complement )=>{

    if(!complement) complement=uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'

    return "_"+ontologyClass.replace(':','')+'_'+complement
}
const getDataPropertiesByClass=(classReference,propertiesList)=>{
    return propertiesList.filter((property)=>{
        return property.classItemMapA==classReference
    })
}
const processClass=(classItem,dataProperties,jsonFileManager)=>{
    console.log(classItem)
    const className=classItem.className
    const jsonPath=classItem.path

    const hasURI= classItem.iri? true: false

    //const elements=jsonFileManager.getPath(jsonPath)

    const allPaths=allPosiblesPaths(jsonPath, jsonFileManager)
    const dataPropertiesClass= getDataPropertiesByClass(classItem,dataProperties)
   
    let relativePathURI=null
    if(hasURI){relativePathURI=classItem.iri.replace(jsonPath,'$')}
    
    const mapElements= allPaths.map((elem,i)=>{


        let iriValue= null
        if(relativePathURI){
            iriValue= jsonFileManager.getPath(relativePathURI.replace('$',elem))
            
        }
        
        const myObj= {
            iriLocal:uriGenerator(className,iriValue),
            iriRemote:null,
            isA:className,
            exactPath:elem,
            dataProperties:processDataProperties(dataPropertiesClass,elem,jsonFileManager),
            
        }
        return myObj
    })

    //console.log("map elements", mapElements)

    return mapElements
    
}

/**
 * 
 * @param {Array} propertiesList is a list of properties that belong an specific class
 * @param {String} indexPath is a position representing location for an individual in the json path. For example '$.experiment[indexPath]'
 * @param {JsonPhis} jsonFileManager is a object class to manipulate json agmip
 */
const processDataProperties=(dataPropertiesList, exacPathOwner, jsonFileManager)=>{

    
    return dataPropertiesList.map((property)=>{
        const valuePath = property.valuePath
        const classItemMapA = property.classItemMapA
        const propertyName=property.propertyName

        // case 1 child value
        let valueProperty=null
        if(valuePath.includes(classItemMapA.path)){
            const exactPathValue=valuePath.replace(classItemMapA.path,'$').replace('$',exacPathOwner)
            valueProperty=jsonFileManager.getPath(exactPathValue)
        }else{
        }
        if(jsonFileManager.hasResponse(valueProperty)){
            return {dataProperty:propertyName, value:valueProperty[0]}
        } 
        else return {dataProperty:propertyName, value:null}
    })
}

const processObjectProperty=(property, allIndividuals)=>{

    
    // A relation to B
    
    const propertyName= property.propertyName
    const classA= property.classItemMapA
    const classB= property.classItemMapB

    const allIndividualsA= allIndividuals.filter((individual)=>{
    
        return individual["isA"]==classA.className
    })

    const allIndividualsB= allIndividuals.filter((individual)=>{
        return individual["isA"]==classB.className
    })

    const objectPropertiesList=[]
    for (let i = 0 ; i< allIndividualsA.length; i++){
        const currentIndividualClassA= allIndividualsA[i]
        const pathClassA= currentIndividualClassA["exactPath"]

        var foundIndividual = allIndividualsB.find(function(individual) {
            return individual["exactPath"].includes(pathClassA);
        });

        if(foundIndividual){
            objectPropertiesList.push({type:property,classAIri:currentIndividualClassA["iriLocal"],classBIri:foundIndividual["iriLocal"]})
        }
    }

    return objectPropertiesList
    
}

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

const getSubPath=(path)=>{
    const POSITION_POINT="3"

    return path.substring(0, path.indexOf('[*]')+POSITION_POINT )
}

const allPosiblesPaths=(path, jsonFileManager)=>{
    if( path.includes('[*]')){// it has an array in their route
      
        const pathSize=jsonFileManager.getPathSize(getSubPath(path))
        let temporalPathList=[]
        for(let i = 0; i< pathSize;i++){
            const newPath = path.replace("[*]","["+i+"]")
            const recursive = allPosiblesPaths(newPath,jsonFileManager)
            temporalPathList=temporalPathList.concat(recursive)
        }
        return temporalPathList
    }else {
        return path
    }
}

const removeDuplicates= (objectList,accumulatedList)=>{

    if (objectList.length==0) return accumulatedList
    else {
        //_oesoGroup_riviere_sebastien
        const currentIndividual=objectList.pop()
        accumulatedList.push(currentIndividual)

        const newList=  objectList.filter((item)=>{
            return currentIndividual["iriLocal"]!== item["iriLocal"]
        })
        return removeDuplicates( newList, accumulatedList )
    }
}
class AgMipPhisMapper {

    getRules(){

        //same level
        // const field= new ClassItemMap(oeso("Field"), "$.experiments[*]" )
        // const fieldLat=new DataPropertyItemMap(icasa("fieldLatitude"), field, "$.experiments[*].fl_lat" )
        // const fieldLong=new DataPropertyItemMap(icasa("fieldLatitude"), field, "$.experiments[*].fl_long" )

        //inside level
        const initialConditions=new ClassItemMap(icasa("initialCondition"), "$.experiments[*].initial_conditions" )

        //upper level
        const experiment= new ClassItemIRIMap(oeso("Experiment"), "$.experiments[*]",  "$.experiments[*].exname")
        const experimentAlias= new DataPropertyItemMap(oeso("alias"), experiment, "$.experiments[*].exname" )
        // const experimentStartDate= new DataPropertyItemMap(oeso("startDate"), experiment, "$.experiments[*].initial_conditions.sdat" )
        // const experimentEndDate= new DataPropertyItemMap(oeso("endDate"), experiment, "$.experiments[*].initial_conditions.tdate" )

        //upper level
        const institution= new ClassItemIRIMap(oeso("Group"), "$.experiments[*]",  "$.experiments[*].institution")
        const institutionName= new DataPropertyItemMap(oeso("name"), institution, "$.experiments[*].institution")
        

        const plot= new ClassItemMap(oeso("Plot"), "$.experiments[*]" )
        const plotLabel= new ClassItemMap(rdfs("label"), plot, "$.experiments[*].trt_name" )
        


        //object properties 
        const hasField = new PropertyItemMap(icasa("hasField"), plot, field )
        const hasInitialConditions = new PropertyItemMap(icasa("hasInitialConditions"), plot, initialConditions )

        const hasInstitution = new PropertyItemMap(icasa("hasInstitution"), experiment, institution )

        return {
            //experiment,
            // classes:[field,plot,experiment, initialConditions, institution],//, initialConditions, plot],
            // dataProperties:[fieldLat, fieldLong, exname, institutionName],
            // objectProperties:[hasField, hasInitialConditions]//[hasInitialConditions]

            classes:[institution, experiment],//, initialConditions, plot],
            dataProperties:[
                institutionName,
                experimentAlias,
                plotLabel
                 //experimentStartDate, experimentEndDate
                ],
            objectProperties:[]//[hasInitialConditions]
        }
    }
    /**
     * @param jsonFileManager is a JsonPhis instance used to manipulate the agmip json file
     * 
     */
    compile(jsonFileManager){ 
        const rules= this.getRules()

        const allIndividuals=rules.classes.map((currentClass)=>{
            return processClass(currentClass, rules.dataProperties,jsonFileManager)
        })

        const allIndividualsFlatten= flatten(allIndividuals)

        const objectProperties = rules.objectProperties.map((currentObjectProperty)=>{
            return processObjectProperty(currentObjectProperty,allIndividualsFlatten)
        })

        const objectPropertiesFlatten= flatten(objectProperties)

        const cleanedIndividuals= removeDuplicates(allIndividualsFlatten,[])
        
        
        return {
            
            individuals:cleanedIndividuals,
            objectProperties:objectPropertiesFlatten
        }
    }
}

module.exports= AgMipPhisMapper