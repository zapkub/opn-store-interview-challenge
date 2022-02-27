import { GraphQLFieldResolver } from "graphql";
import { ApiContext } from "./context";
import { SchemaTypeDefs } from "./types";

export const patientsResolver = async (
  _source,
  _args,
  ctx: ApiContext
): Promise<SchemaTypeDefs.PatientProfile[]> => {
  const result = await ctx.db.readAll(ctx.sessionId);
  return Object.keys(result).map((id) =>
    SchemaTypeDefs.PatientProfile.fromRecord(id, result[id])
  );
};
