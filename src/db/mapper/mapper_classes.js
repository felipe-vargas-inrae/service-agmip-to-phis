class ClassItemMap {
    constructor(className, path){
        this.className=className
        this.path=path
    }
}
class ClassItemIRIMap {
    constructor(className, path, iri){
        this.className=className
        this.path=path
        this.iri=iri
    }
}
class PropertyItemMap {

    constructor(propertyName, classItemMapA, classItemMapB){
        this.propertyName= propertyName
        this.classItemMapA=classItemMapA
        this.classItemMapB=classItemMapB
    }

}
class DataPropertyItemMap {

    constructor(dataPropertyName, classItemMapA, valuePath){
        this.propertyName= dataPropertyName
        this.classItemMapA=classItemMapA
        this.valuePath=valuePath
    }

}


module.exports = {
    ClassItemMap : ClassItemMap,
    ClassItemIRIMap : ClassItemIRIMap,
    PropertyItemMap:PropertyItemMap,
    DataPropertyItemMap:DataPropertyItemMap
}
    
    
