import ClassItemMap from './class_item_map'

class PropertyItemMap {
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
    private _classItemMapB: ClassItemMap
    public get classItemMapB(): ClassItemMap {
        return this._classItemMapB
    }
    public set classItemMapB(value: ClassItemMap) {
        this._classItemMapB = value
    }

    constructor(propertyName: string, classItemMapA: ClassItemMap, classItemMapB: ClassItemMap){
        this.propertyName= propertyName
        this.classItemMapA=classItemMapA
        this.classItemMapB=classItemMapB
    }

}

export default PropertyItemMap