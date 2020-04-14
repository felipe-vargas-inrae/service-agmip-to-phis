class ClassItemMap {

    private _className: string
    private _path: string
    constructor(className:string, path:string){
        this.className=className
        this.path=path
    }

    public get path(): string {
        return this._path
    }
    public set path(value: string) {
        this._path = value
    }
    public get className(): string {
        return this._className
    }
    public set className(value: string) {
        this._className = value
    }
}

export default ClassItemMap
