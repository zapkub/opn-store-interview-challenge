import React, { ComponentType } from "react";
import { SchemaTypeDefs } from "../apis/types";

type PatientTimelineEntryPropTypes = {
  value: SchemaTypeDefs.PatientTimelineEntry;
  onChange: (
    nextValue: SchemaTypeDefs.PatientTimelineEntry,
    evt: React.ChangeEvent<PossibleFormElementEventSource>
  ) => void;
  onAddEntryClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
};
type PossibleFormElementEventSource =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
type PatientTimelineEntryForm = ComponentType<PatientTimelineEntryPropTypes>;
export const PatientTimelineEntryForm: PatientTimelineEntryForm = ({
  value,
  onChange,
  isLoading,
  onAddEntryClick,
}) => {
  const onFieldNameChange =
    (fieldName: keyof SchemaTypeDefs.PatientTimelineEntry) =>
    (evt: React.ChangeEvent<PossibleFormElementEventSource>) => {
      const nextValue = SchemaTypeDefs.PatientTimelineEntry.clone(value);
      switch (fieldName) {
        case "from":
          nextValue[fieldName] = {
            rfc3339: new Date(evt.currentTarget.value).toISOString(),
          };
          break;
        case "to":
          const entryDate = value.from.rfc3339
            ? new Date(value.from.rfc3339)
            : new Date();
          entryDate.setHours(parseInt(evt.currentTarget.value.split(":")[0]));
          entryDate.setMinutes(parseInt(evt.currentTarget.value.split(":")[1]));
          nextValue[fieldName] = {
            rfc3339: entryDate.toISOString(),
          };
          break;
        case "detail":
          nextValue[fieldName] = evt.currentTarget.value;
          break;
        case "locationName":
          nextValue[fieldName] = evt.currentTarget.value;
          break;
        case "locationType": 
          if (SchemaTypeDefs.isLocationType(evt.currentTarget.value)) {
            nextValue[fieldName] = evt.currentTarget.value;
          }
          break;
      }
      onChange(nextValue, evt);
    };
  console.log(value.from.rfc3339);

  return (
    <div className="PatientTimelineEntryForm">
      <div className="PatientTimelineEntryForm__DateInformation">
        <div className="PatientTimelineEntryForm__Field">
          <label>Form</label>
          <input
            value={value.from.rfc3339.substring(0, 16)}
            onChange={onFieldNameChange("from")}
            type="datetime-local"
            placeholder="dd/mm/yyyy --:--"
          />
        </div>
        <div className="PatientTimelineEntryForm__Field">
          <label>To</label>
          <input
            value={value.to.rfc3339.substring(11, 16)}
            onChange={onFieldNameChange("to")}
            type="time"
            placeholder="--:--"
          />
        </div>
      </div>
      <div className="PatientTimelineEntryForm__Detail">
        <div className="PatientTimelineEntryForm__Field">
          <label>Detail</label>
          <textarea
            value={value.detail}
            onChange={onFieldNameChange("detail")}
            placeholder="eg. I work there and grab some sandwich yumyum 🥪"
          />
        </div>
      </div>

      <div className="PatientTimelineEntryForm__LocationInformation">
        <div className="PatientTimelineEntryForm__Field">
          <label>Location Type</label>
          <select
            value={value.locationType}
            onChange={onFieldNameChange("locationType")}
          >
            <option>{SchemaTypeDefs.LocationType.INDOOR}</option>
            <option>{SchemaTypeDefs.LocationType.OUTDOOR}</option>
          </select>
        </div>
        <div className="PatientTimelineEntryForm__Field">
          <label>Location Name</label>
          <input
            value={value.locationName}
            onChange={onFieldNameChange("locationName")}
            type="text"
            max={50}
            placeholder="eg. Starbuck Rama4"
          />
        </div>
      </div>
      <button
        onClick={onAddEntryClick }
        disabled={isLoading || !value.locationName.length || !value.detail.length}
        className="PatientTimelineEntryForm__AddButton"
      >
        + Add Entry
      </button>
    </div>
  );
};
