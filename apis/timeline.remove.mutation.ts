import { ApiContext } from "./context";
import { SchemaTypeDefs } from "./types";

export const removeTimelineEntry = async (
  _source: unknown,
  args: { patientId: string; entryIndex: number },
  ctx: ApiContext
): Promise<SchemaTypeDefs.PatientProfile> => {
  const doc = await ctx.db.read(ctx.sessionId, args.patientId);
  doc.timeline = doc.timeline.filter((_, i) => i !== args.entryIndex);
  await ctx.db.write(ctx.sessionId, args.patientId, doc);
  return SchemaTypeDefs.PatientProfile.fromRecord(args.patientId, doc);
};
