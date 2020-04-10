
const ICASA_PREFIX="icasa:"
const OESO_PREFIX="oeso:"

const icasa=(name)=>{
    return ICASA_PREFIX+name
}
const oeso=(name)=>{
    return OESO_PREFIX+name
}
module.exports ={

    icasa: icasa,
    oeso:oeso
}