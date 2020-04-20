import { ClassItemMap, DataPropertyItemMap, ClassItemIriMap,
    PropertyItemMap, Rules, OntologyFormatHelper } from "./mapper_classes_definitions"


const icasa=OntologyFormatHelper.icasa()
const oepo=OntologyFormatHelper.oepo()
const rdfs=OntologyFormatHelper.rdfs()
const foaf=OntologyFormatHelper.foaf()


class MapperRules {


    getRules(){


        const EXPERIMENT_PATH= "$.experiments[*]"

        // same level
        const field= new ClassItemMap(oepo.Field, EXPERIMENT_PATH )
        // const fieldLat=new DataPropertyItemMap(icasa("fieldLatitude"), field, "$.experiments[*].fl_lat" )
        // const fieldLong=new DataPropertyItemMap(icasa("fieldLatitude"), field, "$.experiments[*].fl_long" )

        // internal level
        const initialConditions=new ClassItemMap(icasa.InitialConditions, EXPERIMENT_PATH+".initial_conditions" )

        // upper level
        const experiment= new ClassItemIriMap(oepo.Experiment, EXPERIMENT_PATH,  EXPERIMENT_PATH+".exname")
        const experimentAlias= new DataPropertyItemMap(oepo.alias, experiment, EXPERIMENT_PATH+".exname" )
        // const experimentStartDate= new DataPropertyItemMap(oepo("startDate"), experiment, "$.experiments[*].initial_conditions.sdat" )
        // const experimentEndDate= new DataPropertyItemMap(oepo("endDate"), experiment, "$.experiments[*].initial_conditions.tdate" )

        // upper level
        const organization= new ClassItemIriMap(foaf.Organization, EXPERIMENT_PATH,  EXPERIMENT_PATH+".institution")
        const organizationName= new DataPropertyItemMap(rdfs.label, organization, EXPERIMENT_PATH+".institution")

        const plot= new ClassItemMap(oepo.Plot, EXPERIMENT_PATH )
        const plotLabel= new DataPropertyItemMap(rdfs.label, plot, EXPERIMENT_PATH+".trt_name" )


        // object properties
        const hasField = new PropertyItemMap(icasa.hasField, plot, field )
        const hasInitialConditions = new PropertyItemMap(icasa.hasInitialConditions, plot, initialConditions )

        const manages = new PropertyItemMap(icasa.manages,organization, experiment )

        return new Rules(
            // experiment,
            // classes:[field,plot,experiment, initialConditions, institution],//, initialConditions, plot],
            // dataProperties:[fieldLat, fieldLong, exname, institutionName],
            // objectProperties:[hasField, hasInitialConditions]//[hasInitialConditions]

            [
                organization, // ,
                experiment
            ],// , initialConditions, plot],
            [
                organizationName,
                experimentAlias
                // plotLabel
                 // experimentStartDate, experimentEndDate
            ],
            [manages]// [hasInitialConditions]
        )
    }
}



export default new MapperRules()