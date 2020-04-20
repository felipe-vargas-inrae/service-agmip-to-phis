
import uuidv1 from 'uuid/v1'

import {IcasaOntology, OepoOntology, RdfsOntology, FoafOntology} from '../../ontologies'
/**
 * Class to get methods for formarting ontologies as turtle expression or ontology terms
 */
class OntologyFormatHelper{
    icasa():IcasaOntology{
        return new IcasaOntology()
    }
    oepo():OepoOntology{
        return new OepoOntology()
    }
    rdfs():RdfsOntology{
        return new RdfsOntology()
    }
    foaf():FoafOntology{
        return new FoafOntology()
    }
    formatDate(dateStr:(string)):string{
        // var st = "26.04.2013";

        const pattern = /(\d{4})(\d{2})(\d{2})/;
        const dt = dateStr.replace(pattern,'$1-$2-$3');
        return dt
    }
    removeLiteral(owlStr:string):string{
        return owlStr.split(':')[1]
    }
    isDateField(fieldName:string):boolean{
        if(typeof(fieldName)!=="string" ){return false}
        const x = fieldName.toLowerCase().includes('date')
        return x
    }
    uriGenerator (ontologyClass: string, complement: string ){

        if(!complement) complement=uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
        return "_"+ontologyClass.replace(':','')+'_'+complement
    }
}
export default new OntologyFormatHelper()