import { ComponentType, useMemo } from "react";
import { SchemaTypeDefs } from "../apis/types";

type PatientTimelineEntryPropTypes = {
  patientTimelineEntry: SchemaTypeDefs.PatientTimelineEntry[];
};
const PatientTimelineEntry: ComponentType<PatientTimelineEntryPropTypes> = ({
  patientTimelineEntry,
}) => {
  return (
    <div className={"PatientTimelineEntry"}>
      <div className="PatientTimelineEntry__Item__Bubble">
        {patientTimelineEntry.map((entry, idx) => {
          const fromDate = new Date(entry.from.rfc3339);
          const toDate = new Date(entry.to.rfc3339);
          return (
            <div className="PatientTimelineEntry__Item" key={idx}>
              <div className="PatientTimelineEntry__Item__Times">
                {fromDate.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "numeric",
                  minute: "numeric",
                })}{" "}
                -{" "}
                {toDate.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <div className="PatientTimelineEntry__Item__Data">
                <div style={{marginBottom: 10}}>{entry.detail}</div>
                <div className="PatientTimelineEntry__Item__Data__Location">
                  {entry.locationType} - {entry.locationName}
                </div>
              </div>
              <div className="PatientTimelineEntry__CloseButtonWrapped">
                <button className="">✕</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type PatientTimelineComponent = ComponentType<PatientTimelinePropTypes> & {
  useTimeline(timelineEntries: SchemaTypeDefs.PatientTimelineEntry[]): Timeline;
};
interface PatientTimelinePropTypes {
  patientTimeline?: SchemaTypeDefs.PatientTimelineEntry[];
}

export const PatientTimeline: PatientTimelineComponent = ({
  patientTimeline = [],
}) => {
  const timelines = PatientTimeline.useTimeline(patientTimeline);

  return (
    <div className="PatientTimeline">
      {timelines.map((timeline) => {
        return (
          <div className="PatientTimeline__Item" key={timeline.date}>
            <div className="PatientTimeline__Item__DateLabel">
              {timeline.date}
            </div>
            <PatientTimelineEntry patientTimelineEntry={timeline.items} />
          </div>
        );
      })}
      {
          !timelines.length && (<div>No timeline entry yet 🌽</div>)
      }
    </div>
  );
};

type DateOnlyString = string;
type TimelineItem = {
  items: SchemaTypeDefs.PatientTimelineEntry[];
  date: DateOnlyString;
};
type Timeline = Array<TimelineItem>;

/**
 * reduce the record item and group into
 * a date based collection
 */
PatientTimeline.useTimeline = (
  timelineEntries: SchemaTypeDefs.PatientTimelineEntry[]
) => {
  return useMemo(
    () =>
      timelineEntries.reduce<Timeline>((prev, entry): Timeline => {
          const d = new Date(entry.from.rfc3339);
        const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() ;
        let timelineItems = prev.find((item) => item.date === date);
        if (!timelineItems) {
          timelineItems = { date, items: [entry] };
          prev.push(timelineItems);
        } else {
          timelineItems.items.push(entry);
        }
        return prev;
      }, []),
    [timelineEntries]
  );
};
