var jp = require('jsonpath');


const getPathSize=(jsonFile,path)=>{
    // console.log("suppath",path)
    // console.log("json", jsonFile)
    return jp.query(jsonFile, path).length;
}
const getSubPath=(path)=>{
    
    const POSITION_POINT=3
    return path.substring(0, path.indexOf('[*]')+POSITION_POINT )
}
const allPosiblesPaths=(path, jsonFile)=>{
    if( path.includes('[*]')){// it has an array in their route
      
        const pathSize=getPathSize(jsonFile,getSubPath(path))
        let temporalPathList=[]
        for(let i = 0; i< pathSize;i++){
            const newPath = path.replace("[*]","["+i+"]")
            const recursive = allPosiblesPaths(newPath,jsonFile)
            temporalPathList=temporalPathList.concat(recursive)
        }
        return temporalPathList
    }else {
        return path
    }
}

const json={
    experiments: [
        {
            initial_conditions:{

                events:[
                    {
                        id:1
                    },
                    {
                        id:2
                    },
                    {
                        id:3
                    }
                ]
            }
        },
        {
            initial_conditions:{

                events:[
                    {
                        id:1
                    }]
            }
        },
        {
            initial_conditions:{

                events:[
                    {
                        id:1
                    },
                    {
                        id:1
                    }
                ]
            }
        }
    ]
}


const path ='$.experiments[*].initial_conditions.events[*]'

console.log(allPosiblesPaths(path,json))