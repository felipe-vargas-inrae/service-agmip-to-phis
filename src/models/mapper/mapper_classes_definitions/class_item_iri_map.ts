
import ClassItemMap from './class_item_map'

class ClassItemIRIMap extends ClassItemMap {

    private _iri: string
    public get iri(): string {
        return this._iri
    }
    public set iri(value: string) {
        this._iri = value
    }
    constructor(className: string, path: string, iri: string){
        super(className,path)
        this.iri=iri
    }
}

export default ClassItemIRIMap