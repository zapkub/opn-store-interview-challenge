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
    OUTDOOR
  }
  type Date {
    rfc3339: String!
  }
  input DateInput {
    rfc3339: String!
  }
  type PatientProfile {
    id: String!
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

  input PatientTimelineEntryInput {
    from: DateInput
    to: DateInput
    detail: String
    locationType: LocationType
    locationName: String
  }
  input PatientProfileInput {
    id: String
    gender: GenderType!
    age: Int!
    occupation: String!
    timeline: [PatientTimelineEntryInput!]
  }

  type Mutation {
    upsertPatient(input: PatientProfileInput!): PatientProfile!
    upsertPatients(input: [PatientProfileInput!]): [PatientProfile!]
    removePatients(ids: [String]!): Boolean

    addTimelineEntry(patientId: String!, input: PatientTimelineEntryInput!): PatientProfile!
    removeTimelineEntry(patientId: String!, entryIndex: Int!): PatientProfile!
  }
`;
