


class RdfsOntology{
    private PREFIX="rdfs:"
    label: string


    private setPrefix(name:string){
        return this.PREFIX+name
    }
    constructor(){

        // classes

        // data properties
        this.label= this.setPrefix("label")
    }
}


export default RdfsOntology