
import { MapperEntityDataProperty } from "."


/**
 * a class for representing the minimal object information for mapping
 * iriLocal and iriRemote are used to match information with the iri created in the remote phis service
 */
class MapperEntity {
    private _iriLocal: string
    public get iriLocal(): string {
        return this._iriLocal
    }
    public set iriLocal(value: string) {
        this._iriLocal = value
    }
    private _iriRemote: string
    public get iriRemote(): string {
        return this._iriRemote
    }
    public set iriRemote(value: string) {
        this._iriRemote = value
    }
    private _isA: string
    public get isA(): string {
        return this._isA
    }
    public set isA(value: string) {
        this._isA = value
    }
    private _exactPath: string
    public get exactPath(): string {
        return this._exactPath
    }
    public set exactPath(value: string) {
        this._exactPath = value
    }
    private _dataProperties: MapperEntityDataProperty[]
    public get dataProperties(): MapperEntityDataProperty[] {
        return this._dataProperties
    }
    public set dataProperties(value: MapperEntityDataProperty[]) {
        this._dataProperties = value
    }
    constructor( iriLocal:string, iriRemote:string, isA:string,  exactPath:string, dataProperties:MapperEntityDataProperty[]){
        this.iriLocal=iriLocal
        this.iriRemote=iriRemote,
        this.isA=isA,
        this.exactPath=exactPath,
        this.dataProperties=dataProperties
    }

    getOneValueByDataProperty(dataPropertyName:string): string|number {

        for (const property of this.dataProperties){
            if(property.propertyName===dataPropertyName){
                return property.value
            }
        }
        return null
    }
}

export default MapperEntity
