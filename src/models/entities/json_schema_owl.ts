// https://json-schema.org/draft-07/json-schema-release-notes.html
// not used yet
const schema={

    properties:{
        experiments:{
            type:"object",
            required:["field_id","exname"],
            properties:{
                "field_id":{
                    type:["string"]
                },
                "exname":{
                    type:["string"]
                }
            }
        }

    }
}
