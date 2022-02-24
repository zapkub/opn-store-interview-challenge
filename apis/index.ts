import { nanoid } from 'nanoid';
import http from 'http';
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { Request, Response, Application } from 'express'
import { patientsResolver } from "./patients.reslover";
import { typeDefs } from "./typedef";

export function createServer(app: Application) {

    const server = new ApolloServer({ 
        typeDefs: typeDefs, 
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http.createServer(app) })],
        context: ({ req, res }: {req: Request<{},unknown,unknown, { sessionId?: string}>, res: Response}) => {
            const { sessionId = nanoid() } = req.query;
            if (!req.query.sessionId) {
                res.cookie('x-session-id', sessionId);
            }
            return {
                sessionId,
            }
        },
        resolvers: {
        Query: {
            patients: patientsResolver,
        },
    } })

    return server;

}