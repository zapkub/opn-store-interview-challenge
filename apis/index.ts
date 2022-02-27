import { nanoid } from "nanoid";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { Request, Response, Application } from "express";
import { patientsResolver } from "./patients.reslover";
import { typeDefs } from "./typedef";
import {
  upsertPatientMutation,
  upsertPatientsMutation,
} from "./patient.upsert.mutation";
import { ApiContext } from "./context";
import { Database } from "./db";
import { removeTimelineEntry } from "./timeline.remove.mutation";
import { addTimelineEntry } from "./timeline.add.mutation";
import { removePatientsMutation } from "./patient.remove.mutation";

export function createServer(app: Application, db: Database.DB) {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: http.createServer(app) }),
    ],
    context: ({
      req,
      res,
    }: {
      req: Request<{}, unknown, unknown, { ['session-id']?: string }>;
      res: Response;
    }) => {
      if (!req.query['session-id']) {
        return res.status(400).json({ errors: [{ message: "SessionId is required" }] });
      }
      return {
        sessionId: req.query['session-id'],
        db,
        logger: console,
      } as ApiContext;
    },
    resolvers: {
      Query: {
        patients: patientsResolver,
      },
      Mutation: {
        upsertPatient: upsertPatientMutation,
        upsertPatients: upsertPatientsMutation,
        removePatients: removePatientsMutation,
        removeTimelineEntry: removeTimelineEntry,
        addTimelineEntry: addTimelineEntry,
      },
    },
  });

  return server;
}
