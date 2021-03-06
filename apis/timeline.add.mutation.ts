import { ApiContext } from "./context";
import { SchemaTypeDefs } from "./types";
import { orderBy, sortBy } from 'lodash'

export const addTimelineEntry = async (
  _source: unknown,
  arg: { patientId: string; input: SchemaTypeDefs.PatientTimelineEntryInput },
  ctx: ApiContext
): Promise<SchemaTypeDefs.PatientProfile> => {
  ctx.logger.log(
    `[addTimelineEntry] add timeline entry to patient ${arg.patientId}, `,
    arg.input,
  );
  let doc = await ctx.db.read(ctx.sessionId, arg.patientId);
  doc.timeline.push(
    SchemaTypeDefs.PatientTimelineEntryInput.toRecord(arg.input)
  );
  doc.timeline = orderBy(doc.timeline, (prev) => {
    return prev.from.getTime()
  }, 'desc')
  await ctx.db.write(ctx.sessionId, arg.patientId, doc);
  doc = await ctx.db.read(ctx.sessionId, arg.patientId);
  return SchemaTypeDefs.PatientProfile.fromRecord(arg.patientId, doc);
};
