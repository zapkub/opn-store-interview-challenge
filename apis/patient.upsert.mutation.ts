import { nanoid } from "nanoid";
import { ApiContext } from "./context";
import { Database } from "./db";
import { SchemaTypeDefs } from "./types";

export const upsertPatientsMutation = (
  _source: unknown,
  arg: { input: SchemaTypeDefs.PatientProfileInput[] },
  ctx: ApiContext
) => {
  return Promise.all(
    arg.input.map((item) =>
      upsertPatientMutation(_source, { input: item }, ctx)
    )
  );
};

export const upsertPatientMutation = async (
  _source: unknown,
  { input }: { input: SchemaTypeDefs.PatientProfileInput },
  ctx: ApiContext
): Promise<SchemaTypeDefs.PatientProfile> => {
  const id = input.id || nanoid();
  ctx.logger.log("[upsertPatientMutation] with id:", id);

  let doc: Database.PatientRecord = {
    timeline: [],
    ...input,
  };
  try {
    doc = await ctx.db.read(ctx.sessionId, id);
    doc = {
      ...doc,
      ...input,
    };
  } catch (e) {
    if (!(e instanceof Error)) {
      throw e
    }
    if (!Database.Errors.isNotFoundError(e)) {
      throw e;
    }
  }
  await ctx.db.write(ctx.sessionId, id, doc);
  doc = await ctx.db.read(ctx.sessionId, id);
  return SchemaTypeDefs.PatientProfile.fromRecord(id, doc);
};
