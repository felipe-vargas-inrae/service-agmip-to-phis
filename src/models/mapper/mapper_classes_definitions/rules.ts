
import {ClassItemMap, ClassItemIriMap, DataPropertyItemMap, PropertyItemMap} from './'

class Rules {
    private _dataProperties: DataPropertyItemMap[]
    public get dataProperties(): DataPropertyItemMap[] {
        return this._dataProperties
    }
    public set dataProperties(value: DataPropertyItemMap[]) {
        this._dataProperties = value
    }
    private _objectProperties: PropertyItemMap[]
    public get objectProperties(): PropertyItemMap[] {
        return this._objectProperties
    }
    public set objectProperties(value: PropertyItemMap[]) {
        this._objectProperties = value
    }
    private _classes: ClassItemMap[] | ClassItemIriMap[]
    public get classes(): ClassItemMap[] | ClassItemIriMap[] {
        return this._classes
    }
    public set classes(value: ClassItemMap[] | ClassItemIriMap[]) {
        this._classes = value
    }


    constructor(classes: ClassItemMap[] | ClassItemIriMap[], dataProperties: DataPropertyItemMap[], objectProperties: PropertyItemMap[]){
        this.classes=classes
        this.dataProperties=dataProperties
        this.objectProperties= objectProperties
    }
}

export default Rules