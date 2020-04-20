
class FoafOntology{
    private PREFIX="foaf:"
    Organization: string

    private setPrefix(name:string){
        return this.PREFIX+name
    }
    constructor(){

        this.Organization = this.setPrefix("Organization")
    }
}


export default FoafOntology