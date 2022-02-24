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
                {entry.detail}
                <div className="PatientTimelineEntry__Item__Data__Location">
                  {entry.locationType} - {entry.locationName}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type DateOnlyString = string;
type TimelineItem = {
  items: SchemaTypeDefs.PatientTimelineEntry[];
  date: DateOnlyString;
};
type Timeline = Array<TimelineItem>;
interface PatientTimelinePropTypes {
  patientTimeline?: SchemaTypeDefs.PatientTimelineEntry[];
}
export const PatientTimeLine: ComponentType<PatientTimelinePropTypes> = ({
  patientTimeline = [],
}) => {
  const timelines = useMemo(
    () =>
      patientTimeline.reduce<Timeline>((prev, entry): Timeline => {
        const date = new Date(entry.from.rfc3339).toLocaleDateString();
        let timelineItems = prev.find((item) => item.date === date);
        if (!timelineItems) {
          timelineItems = { date, items: [entry] };
          prev.push(timelineItems);
        } else {
          timelineItems.items.push(entry);
        }
        return prev;
      }, []),
    [patientTimeline]
  );
  console.log(patientTimeline, timelines);

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
    </div>
  );
};
