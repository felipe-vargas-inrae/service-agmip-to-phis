// // constans
// const fs = require('fs');
// const util = require('util');
// const readFile = util.promisify(fs.readFile);
// var jp = require('jsonpath');

// //fields
// EXPERIMENT_NAME="exname"
// INSTITUTIONS_NAME="institution"
// //sections
// EXPERIMENTS="experiments"


// /**
//  *
//  */
// class JsonPhis {

//     constructor(filePath){
//         const  content=  fs.readFileSync(filePath)
//         this.jsonPhis=JSON.parse(content)
//     }

//     getExperiments(){
//         const experimentsRepeated=this.jsonPhis[EXPERIMENTS].map((item)=>{
//             return item[EXPERIMENT_NAME]
//         })
//         const experiments=new Set(experimentsRepeated)
//         return [...experiments]
//     }

//     getInstitutions(){
//         const institutionsRepeated=this.jsonPhis[EXPERIMENTS].map((item)=>{
//             return item[INSTITUTIONS_NAME]
//         })
//         const institutions=new Set(institutionsRepeated)
//         return [...institutions]
//     }

//     getPath(path){
//         return jp.query(this.jsonPhis, path);
//     }

//     getPathSize(path){
//         // console.log("suppath",path)
//         // console.log("json", jsonFile)
//         return jp.query(this.jsonPhis, path).length;
//     }

//     hasResponse(resultJsonPath){
//         return resultJsonPath.length>0
//     }

// }

// module.exports = JsonPhis