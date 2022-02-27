import { ApiContext } from "./context";

export const removePatientsMutation = async (
  _source,
  arg: { ids: string[] },
  ctx: ApiContext
): Promise<boolean> => {
    await Promise.all(arg.ids.map(id => ctx.db.delete(ctx.sessionId, id)));
    return true
};

