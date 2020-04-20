


class OepoOntology{
    private PREFIX="oepo:"

    Field: string
    Experiment: string
    alias: string
    Group: string
    name: string
    Plot: string

    private setPrefix(name:string){
        return this.PREFIX+name
    }
    constructor(){

        // classes
        this.Field= this.setPrefix("Field")
        this.Experiment= this.setPrefix("Experiment")
        this.Group= this.setPrefix("Group")
        this.Plot= this.setPrefix("Plot")


        // data properties
        this.alias= this.setPrefix("alias")
        this.name= this.setPrefix("name")
    }
}


export default OepoOntology