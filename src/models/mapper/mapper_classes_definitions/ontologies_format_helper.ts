
import uuidv1 from 'uuid/v1'


// constans
const ICASA_PREFIX="icasa:"
const OESO_PREFIX="oeso:"
const RDFS_PREFIX="rdfs:"

// constans ontologies classes

const EXPERIMENTS = "Experiments"
const INSTITUCIONS = "Group"

/**
 * Class to get methods for formarting ontologies as turtle expression or ontology terms
 */
class OntologyFormatHelper{
    icasa(name:string):string{
        return ICASA_PREFIX+name
    }
    oeso(name:string):string{
        return OESO_PREFIX+name
    }
    rdfs(name: string){
        return RDFS_PREFIX+name
    }
    formatDate(dateStr:string):string{
        // var st = "26.04.2013";
        const pattern = /(\d{4})(\d{2})(\d{2})/;
        const dt = dateStr.replace(pattern,'$1-$2-$3');
        return dt
    }
    removeLiteral(owlStr:string):string{
        return owlStr.split(':')[1]
    }
    isDateField(fieldName:string):boolean{
        const x = fieldName.toLowerCase().includes('date')
        return x
    }
    uriGenerator (ontologyClass: string, complement: string ){

        if(!complement) complement=uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
        return "_"+ontologyClass.replace(':','')+'_'+complement
    }

    institucionClass(){
        return this.oeso(INSTITUCIONS)
    }

    experimentClass(){
        return this.oeso(EXPERIMENTS)
    }
}
export default new OntologyFormatHelper()