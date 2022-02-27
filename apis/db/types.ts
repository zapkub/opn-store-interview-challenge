export namespace Database {
  export enum GenderType {
    FEMALE = "FEMALE",
    MALE = "MALE",
    NON_BINARY = "NON_BINARY",
    TRANSGENDER = "TRANSGENDER",
    INTERSEX = "INTERSEX",
  }

  export enum LocationType {
    HOME = "HOME",
    INDOOR = "INDOOR",
    OUTDOOR = "OUTDOOR",
    TRAVELLING = "TRAVELLING"
  }

  export interface PatientTimelineRecord {
    from: Date;
    to: Date;
    detail: string;
    locationType: LocationType;
    locationName: string;
  }

  export const PatientTimelineRecord = {
    validate: (value: PatientTimelineRecord) => {},
  };

  export interface PatientRecord {
    age: number;
    gender: GenderType;
    occupation: string;
    timeline: PatientTimelineRecord[];
  }

  export interface DB {
    write(sessionId: string, key: string, value: PatientRecord): Promise<void>;
    read(sessionId: string, key: string): Promise<PatientRecord>;
    readAll(sessionId: string): Promise<{ [key: string]: Database.PatientRecord }>;
    delete(sessionId: string, key: string): Promise<void>
  }

  export const Errors = {
      notfound: (key: string) => new Error(`${key} not found`),
      isNotFoundError: (error: Error) => error.message.includes("not found"),
      invalidSessionId: (sessionId: string) => new Error(`Invalid sessionId: ${sessionId}`),
  }
}
