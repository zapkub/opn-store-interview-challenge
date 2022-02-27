import { Database } from "./db/types";

type NativeDate = Date;
const NativeDate = Date;
export namespace SchemaTypeDefs {
  export type GenderType = Database.GenderType;
  export const GenderType = Database.GenderType;
  export const isGenderType = (value: any): value is GenderType => {
    return (
      value === GenderType.FEMALE ||
      value === GenderType.INTERSEX ||
      value === GenderType.MALE ||
      value === GenderType.NON_BINARY ||
      value === GenderType.TRANSGENDER
    );
  };

  export type LocationType = Database.LocationType;
  export const LocationType = Database.LocationType;
  export const isLocationType = (value: any): value is LocationType => {
    return (
      value === LocationType.INDOOR ||
      value === LocationType.OUTDOOR ||
      value === LocationType.TRAVELLING ||
      value === LocationType.HOME
    );
  };

  export interface Date {
    rfc3339: string;
  }
  const Date = {
    fromDate: (value: NativeDate): Date => {
      return {
        rfc3339: value.toISOString(),
      };
    },
  };

  export interface PatientTimelineEntry {
    from: Date;
    to: Date;
    detail: string;
    locationType: LocationType;
    locationName: string;
  }
  export type PatientTimelineEntryInput = PatientTimelineEntry;
  export const PatientTimelineEntryInput = {
    new: (): PatientTimelineEntryInput => {
      const now = new NativeDate().toISOString();
      return {
        detail: "",
        from: { rfc3339: now },
        to: { rfc3339: now },
        locationName: "",
        locationType: LocationType.INDOOR,
      };
    },
    toRecord: (
      value: PatientTimelineEntryInput
    ): Database.PatientTimelineRecord => {
      return {
        from: new NativeDate(value.from.rfc3339),
        to: new NativeDate(value.to.rfc3339),
        detail: value.detail,
        locationName: value.locationName,
        locationType: value.locationType,
      };
    },
  };

  export const PatientTimelineEntry = {
    fromRecord: (
      value: Database.PatientTimelineRecord
    ): PatientTimelineEntry => ({
      from: Date.fromDate(value.from),
      to: Date.fromDate(value.to),
      detail: value.detail,
      locationName: value.locationName,
      locationType: value.locationType,
    }),
    clone: (value: PatientTimelineEntry) => {
      return {
        ...value,
      };
    },
  };

  export interface PatientProfile {
    id: string;
    gender: GenderType;
    age: number;
    occupation: string;
    timeline: PatientTimelineEntry[];
  }

  export const PatientProfile = {
    fromRecord: (id: string, value: Database.PatientRecord): PatientProfile => {
      return {
        id,
        age: value.age,
        gender: value.gender,
        occupation: value.occupation,
        timeline: value.timeline.map(PatientTimelineEntry.fromRecord),
      };
    },
    clone: (value: PatientProfile): PatientProfile => {
      return {
        ...value,
        timeline: value.timeline.map(PatientTimelineEntry.clone),
      };
    },
  };

  export interface PatientProfileInput {
    id?: string;
    gender: GenderType;
    age: number;
    occupation: string;
  }
  export const PatientProfileInput = {
    new: (): PatientProfileInput => ({
      age: 0,
      gender: GenderType.FEMALE,
      occupation: "",
    }),
  };
}
