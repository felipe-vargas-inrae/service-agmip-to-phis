


class IcasaOntology{
    private PREFIX="icasa:"
    Organization:string
    InitialConditions: string
    hasField: string
    hasInitialConditions: string
    manages: string

    private setPrefix(name:string){
        return this.PREFIX+name
    }
    constructor(){

        // classes
        this.Organization= this.setPrefix("Organization")
        this.InitialConditions= this.setPrefix("InitialCondition")

        // data properties
        this.hasField=this.setPrefix("hasField")
        this.hasInitialConditions=this.setPrefix("hasInitialConditions")
        this.manages=this.setPrefix("manages")
    }
}


export default IcasaOntology