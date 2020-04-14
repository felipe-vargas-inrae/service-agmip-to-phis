
/**
 * A class to manage functions related to application monitoring
 */
class Performance {
    memoryUsage():void{
        const used = process.memoryUsage();
        for (const key of Object.keys(used)) {
            console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
        }
    }
    timeUsage(start:Date,end:Date):void{
        const deltaDates= end.valueOf() -start.valueOf()
        console.log("time: "+(deltaDates)+"ms")
    }
}


export default new Performance()