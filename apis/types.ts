

export namespace SchemaTypeDefs {
    export enum GenderType {
        FEMALE = 'FEMALE',
        MALE = 'MALE',
        NON_BINARY = 'NON_BINARY',
        TRANSGENDER = 'TRANSGENDER',
        INTERSEX = 'INTERSEX'
    }

    export interface Date {
        rfc3339: string;
    }

    export enum LocationType {
        INDOOR = "INDOOR"
    }

    export interface PatientTimelineEntry {
        from: Date,
        to: Date,
        detail: string
        locationType: LocationType,
        locationName: string
    }

    export interface PatientProfile {
        gender: GenderType
        age: number
        occupation: string
        timeline: PatientTimelineEntry[]
    }

}