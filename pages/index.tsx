import { useState } from "react";
import { PatientInformation } from "../components/PatientInformation";
import { PatientTimeLine } from "../components/PatientTimeline";
import { Tabbar } from "../components/Tabbar";
import { usePatientsAPI } from "../hooks/usePatientsAPI";

export default () => {
  const [currentSelectedTabbarIndex, setCurrentSelectedTabbarIndex] =
    useState(0);
  const { patients } = usePatientsAPI();

  return (
    <div className={"AppContainer"}>
      <Tabbar
        selectedIndex={currentSelectedTabbarIndex}
        onChange={setCurrentSelectedTabbarIndex}
        items={patients.map((_, idx) => ({ label: "" + (idx + 1) }))}
      />

      <PatientInformation />

      <PatientTimeLine patientTimeline={
          patients[currentSelectedTabbarIndex]?.timeline
      } />


    </div>
  );
};
