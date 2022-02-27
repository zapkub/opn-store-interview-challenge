import { IResolvers } from '@graphql-tools/utils';
import { Config } from 'apollo-server-core'
import {  } from 'graphql'
import { Database } from "./db";



export interface ApiContext {
    sessionId: string
    db: Database.DB
    logger: {
        log: (message: string, ...args: unknown[]) => void
    }
}
