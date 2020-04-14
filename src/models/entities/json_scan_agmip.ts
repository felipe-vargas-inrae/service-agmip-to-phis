// constans
import fs from 'fs'
// import util from 'util'
// const readFile = util.promisify(fs.readFile)
import jp  from 'jsonpath'

// fields
const EXPERIMENT_NAME="exname"
const INSTITUTIONS_NAME="institution"
// sections
const EXPERIMENTS="experiments"

/**
 * Methods for quering AgMIP JSON file
 */
class JsonScanAgMIP {
    private jsonPhis:object
    constructor(filePath: string){
        const  content=  fs.readFileSync(filePath)
        this.jsonPhis=JSON.parse(content.toString())
    }

    getExperiments(){
        const experimentsRepeated=this.jsonPhis[EXPERIMENTS].map((item)=>{
            return item[EXPERIMENT_NAME]
        })
        const experiments=new Set(experimentsRepeated)
        return [...experiments]
    }

    getInstitutions(){
        const institutionsRepeated=this.jsonPhis[EXPERIMENTS].map((item)=>{
            return item[INSTITUTIONS_NAME]
        })
        const institutions=new Set(institutionsRepeated)
        return [...institutions]
    }

    getPath(path:string){
        return jp.query(this.jsonPhis, path)
    }

    getPathFirstElement(path:string): string {
        try {
            return this.getPath(path)[0]
        }catch(e){
            if(e instanceof RangeError){
                console.error("getPathFirstElement: not element found for path")
            }
            else{
               console.error("getPathFirstElement: unknow error")
            }
        }
    }

    getPathSize(path:string){
        // console.log("suppath",path)
        // console.log("json", jsonFile)
        return jp.query(this.jsonPhis, path).length
    }

    hasResponse(resultJsonPath:any[] ){
        return resultJsonPath.length>0
    }
}

export default JsonScanAgMIP