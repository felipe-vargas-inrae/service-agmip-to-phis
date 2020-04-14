
import ClassItemMap from './class_item_map'

class DataPropertyItemMap {
    private _propertyName: string
    public get propertyName(): string {
        return this._propertyName
    }
    public set propertyName(value: string) {
        this._propertyName = value
    }
    private _classItemMapA: ClassItemMap
    public get classItemMapA(): ClassItemMap {
        return this._classItemMapA
    }
    public set classItemMapA(value: ClassItemMap) {
        this._classItemMapA = value
    }
    private _valuePath: string
    public get valuePath(): string {
        return this._valuePath
    }
    public set valuePath(value: string) {
        this._valuePath = value
    }

    constructor(dataPropertyName: string, classItemMapA: ClassItemMap, valuePath: string){
        this.propertyName= dataPropertyName
        this.classItemMapA=classItemMapA
        this.valuePath=valuePath
    }
}

export default DataPropertyItemMap