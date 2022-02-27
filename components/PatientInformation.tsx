import React, {
  ComponentType,
  HTMLInputTypeAttribute,
  useCallback,
} from "react";
import { SchemaTypeDefs } from "../apis/types";

type PatientInformationPropTypes = {
  value: SchemaTypeDefs.PatientProfile;
  onChange: (
    nextValue: PatientInformationPropTypes["value"],
    evt: React.ChangeEvent
  ) => void;
};

type PatientInformationComponent = ComponentType<PatientInformationPropTypes>;

export const PatientInformation: PatientInformationComponent = ({
  value,
  onChange,
}) => {
  const onOccupationFieldChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = SchemaTypeDefs.PatientProfile.clone(value);
      nextValue["occupation"] = evt.currentTarget.value;
      onChange(nextValue, evt);
    },
    [value, onChange]
  );

  const onAgeFieldChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const age = parseInt(evt.currentTarget.value);
      if (!age) {
        return;
      }
      const nextValue = SchemaTypeDefs.PatientProfile.clone(value);
      nextValue.age = age;
      onChange(nextValue, evt);
    },
    [value, onChange]
  );

  const onGenderTypeFieldChange = (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nextValue = SchemaTypeDefs.PatientProfile.clone(value);
    if (!SchemaTypeDefs.isGenderType(evt.currentTarget.value)) {
      return;
    }
    nextValue.gender = evt.currentTarget.value;
    onChange(nextValue, evt);
  };

  return (
    <div className={"PatientInformation"}>
      <form>
        <div className="PatientInformation__Field Gender">
          <label htmlFor="GenderSelect">Gender</label>
          <select
            id="GenderSelect"
            className="PatientInformation__GenderSelect"
            onChange={onGenderTypeFieldChange}
            value={value.gender}
          >
            <option className="PatientInformation__GenderSelect__Option">
              {SchemaTypeDefs.GenderType.FEMALE}
            </option>
            <option className="PatientInformation__GenderSelect__Option">
              {SchemaTypeDefs.GenderType.MALE}
            </option>
            <option className="PatientInformation__GenderSelect__Option">
              {SchemaTypeDefs.GenderType.INTERSEX}
            </option>
            <option className="PatientInformation__GenderSelect__Option">
              {SchemaTypeDefs.GenderType.NON_BINARY}
            </option>
            <option className="PatientInformation__GenderSelect__Option">
              {SchemaTypeDefs.GenderType.TRANSGENDER}
            </option>
          </select>
        </div>
        <div className="PatientInformation__Field Age">
          <label htmlFor="AgeInput">Age</label>
          <input
            id="AgeInput"
            className="PatientInformation__AgeInput"
            placeholder="eg. 23, 58"
            onChange={onAgeFieldChange}
            value={value.age}
            type="number"
          />
        </div>
        <div className="PatientInformation__Field Occupation">
          <label htmlFor="OccupationInput">Occupation</label>
          <input
            id="OccupationInput"
            className="PatientInformation__OccupationInput"
            placeholder="eg. Mathematician"
            onChange={onOccupationFieldChange}
            value={value.occupation}
          />
        </div>
      </form>
    </div>
  );
};

type PatientInformationBadgeComponent = ComponentType<{
  value: SchemaTypeDefs.PatientProfile;
}>;
export const PatientInformationBadge: PatientInformationBadgeComponent = ({
  value,
}) => {
  return (
    <div className={"PatientInformationBadge"}>
      <div className="PatientInformationBadge__Content">
        <span className="x-small">{value.gender}</span>
        <span>{value.age} Years Old</span>
        <span className="x-small">{value.occupation}</span>
      </div>
    </div>
  );
};
