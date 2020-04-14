import { ClassItemMap, DataPropertyItemMap, ClassItemIriMap,
    PropertyItemMap, Rules, OntologyFormatHelper } from "./mapper_classes_definitions"


const icasa=OntologyFormatHelper.icasa
const oeso=OntologyFormatHelper.oeso
const rdfs=OntologyFormatHelper.rdfs


class MapperRules {


    getRules(){

        // same level
        const field= new ClassItemMap(oeso("Field"), "$.experiments[*]" )
        // const fieldLat=new DataPropertyItemMap(icasa("fieldLatitude"), field, "$.experiments[*].fl_lat" )
        // const fieldLong=new DataPropertyItemMap(icasa("fieldLatitude"), field, "$.experiments[*].fl_long" )

        // internal level
        const initialConditions=new ClassItemMap(icasa("initialCondition"), "$.experiments[*].initial_conditions" )

        // upper level
        const experiment= new ClassItemIriMap(oeso("Experiment"), "$.experiments[*]",  "$.experiments[*].exname")
        const experimentAlias= new DataPropertyItemMap(oeso("alias"), experiment, "$.experiments[*].exname" )
        // const experimentStartDate= new DataPropertyItemMap(oeso("startDate"), experiment, "$.experiments[*].initial_conditions.sdat" )
        // const experimentEndDate= new DataPropertyItemMap(oeso("endDate"), experiment, "$.experiments[*].initial_conditions.tdate" )

        // upper level
        const institution= new ClassItemIriMap(oeso("Group"), "$.experiments[*]",  "$.experiments[*].institution")
        const institutionName= new DataPropertyItemMap(oeso("name"), institution, "$.experiments[*].institution")

        const plot= new ClassItemMap(oeso("Plot"), "$.experiments[*]" )
        const plotLabel= new DataPropertyItemMap(rdfs("label"), plot, "$.experiments[*].trt_name" )


        // object properties
        const hasField = new PropertyItemMap(icasa("hasField"), plot, field )
        const hasInitialConditions = new PropertyItemMap(icasa("hasInitialConditions"), plot, initialConditions )

        const hasInstitution = new PropertyItemMap(icasa("hasInstitution"), experiment, institution )

        return new Rules(
            // experiment,
            // classes:[field,plot,experiment, initialConditions, institution],//, initialConditions, plot],
            // dataProperties:[fieldLat, fieldLong, exname, institutionName],
            // objectProperties:[hasField, hasInitialConditions]//[hasInitialConditions]

           [institution, experiment],// , initialConditions, plot],
            [
                institutionName,
                experimentAlias,
                plotLabel
                 // experimentStartDate, experimentEndDate
            ],
            []// [hasInitialConditions]
        )
    }
}



export default new MapperRules()