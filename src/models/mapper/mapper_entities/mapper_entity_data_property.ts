class MapperEntityDataProperty {
    private _propertyName: string
    public get propertyName(): string {
        return this._propertyName
    }
    public set propertyName(value: string) {
        this._propertyName = value
    }
    private _value: string | number
    public get value(): string | number {
        return this._value
    }
    public set value(value: string | number) {
        this._value = value
    }
    constructor(propertyName:string, value:(string|number)){
        this.propertyName= propertyName
        this.value=value
    }
}


export default MapperEntityDataProperty