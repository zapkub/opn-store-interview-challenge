import { gql } from "apollo-server";

export const typeDefs = gql`
    enum GenderType {
        FEMALE
        MALE
        NON_BINARY
        TRANSGENDER
        INTERSEX
    }
    enum LocationType {
      INDOOR
    }
    type Date {
      rfc3339: String!
    }
  type PatientProfile {
      gender: GenderType!
      age: Int!
      occupation: String!
      timeline: [PatientTimelineEntry!]!
  }

  type PatientTimelineEntry {
    from: Date
    to: Date
    detail: String
    locationType: LocationType
    locationName: String
  }

  type Query {
    patients: [PatientProfile!]
  }
`;
