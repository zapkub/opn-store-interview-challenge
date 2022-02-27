import { Mutex } from "async-mutex";
import { Database } from "./types";

type PatientId = string;
type SessionId = string;
type PatientStorage = {
  [key: SessionId]: { [key: PatientId]: Database.PatientRecord };
};

export class InmemoryDB implements Database.DB {
  private _data: PatientStorage = seed;
  private _mutext = new Mutex();

  delete(sessionId: string, key: string): Promise<void> {
    if (!this._data[sessionId]) {
      this._data[sessionId] = {};
    }
    delete this._data[sessionId][key];
    return Promise.resolve();
  }
  write(
    sessionId: string,
    key: string,
    value: Database.PatientRecord
  ): Promise<void> {

    return this._mutext.runExclusive(() => {
      if (this._data[sessionId] === undefined) {
        this._data[sessionId] = {};
      }
      this._data[sessionId][key] = value;
    });
  }

  async read(sessionId: string, key: string): Promise<Database.PatientRecord> {
    if (!this._data[sessionId]) {
      throw Database.Errors.invalidSessionId(sessionId);
    }
    const result = this._data[sessionId][key];
    if (!result) {
      throw Database.Errors.notfound(key);
    }
    return Promise.resolve(result);
  }

  readAll(
    sessionId: string
  ): Promise<{ [key: PatientId]: Database.PatientRecord }> {
    if (!this._data[sessionId]) {
      this._data[sessionId] = {};
    }
    return Promise.resolve(this._data[sessionId]);
  }
}

const seed: PatientStorage = {
  default: {
    "1": {
      age: 32,
      gender: Database.GenderType.MALE,
      occupation: "Software Engineer",
      timeline: [
        {
          from: new Date("2022-02-02T13:22:23.000Z"),
          to: new Date("2022-02-02T13:29:23.000Z"),
          detail: "Work",
          locationName: "Starbuck K-Village",
          locationType: Database.LocationType.INDOOR,
        },
        {
          from: new Date("2022-02-01T16:22:23.000Z"),
          to: new Date("2022-02-01T16:29:23.000Z"),
          detail: "get some meal",
          locationName: "McDonalds Onnuch",
          locationType: Database.LocationType.INDOOR,
        },
        {
          from: new Date("2022-02-01T11:22:23.000Z"),
          to: new Date("2022-02-01T11:29:23.000Z"),
          detail: "work",
          locationName: "De NaLa Cafe",
          locationType: Database.LocationType.INDOOR,
        },
      ],
    },
  },
};
