import { GraphQLFieldResolver } from "graphql"
import { SchemaTypeDefs } from "./types"


const patiants: SchemaTypeDefs.PatientProfile[] = [
    {
        age: 32,
        gender: SchemaTypeDefs.GenderType.MALE,
        occupation: 'Software Engineer',
        timeline: [

            {
                from: {
                    rfc3339: new Date("2022-02-02T13:22:23.000Z").toISOString(),
                },
                to: {
                    rfc3339: new Date("2022-02-02T13:29:23.000Z").toISOString(),
                },
                detail: 'Work',
                locationName: 'Starbuck K-Village',
                locationType: SchemaTypeDefs.LocationType.INDOOR,
            },
            {
                from: {
                    rfc3339: new Date("2022-02-01T16:22:23.000Z").toISOString(),
                },
                to: {
                    rfc3339: new Date("2022-02-01T16:29:23.000Z").toISOString(),
                },
                detail: 'get some meal',
                locationName: 'McDonalds Onnuch',
                locationType: SchemaTypeDefs.LocationType.INDOOR,
            },
            {
                from: {
                    rfc3339: new Date("2022-02-01T11:22:23.000Z").toISOString(),
                },
                to: {
                    rfc3339: new Date("2022-02-01T11:29:23.000Z").toISOString(),
                },
                detail: 'work',
                locationName: 'De NaLa Cafe',
                locationType: SchemaTypeDefs.LocationType.INDOOR,
            }
        ],
    },

    {
        age: 28,
        gender: SchemaTypeDefs.GenderType.FEMALE,
        occupation: 'Teacher',
        timeline: [],
    }
];

export const patientsResolver = (_source, _args, ctx) => {
    console.log(ctx)
    return patiants;
}


