
class MapperEntityObjectProperty {
    private _propertyName: string
    private _classBIri: string
    private _classAIri: string

    public get classBIri(): string {
        return this._classBIri
    }
    public set classBIri(value: string) {
        this._classBIri = value
    }
    public get propertyName(): string {
        return this._propertyName
    }
    public set propertyName(value: string) {
        this._propertyName = value
    }
    public get classAIri(): string  {
        return this._classAIri
    }
    public set classAIri(classAIri: string ) {
        this._classAIri = classAIri
    }
    constructor(propertyName:string, classAIri:string, classBIri:string){
        this.propertyName= propertyName
        this.classAIri=classAIri
        this.classBIri=classBIri
    }
}


export default MapperEntityObjectProperty
