import { useEffect, useState } from "react";
import {
  PatientInformation,
  PatientInformationBadge,
} from "../components/PatientInformation";
import { PatientTimeline } from "../components/PatientTimeline";
import { PatientTimelineEntryForm } from "../components/PatientTimelineEntryForm";
import { RemovePatientButton } from "../components/RemovePatientButton";
import { Tabbar } from "../components/Tabbar";
import { VisitedPlace } from "../components/VisitedPlace";
import {
  usePatientProfileMutation,
  usePatientsAPI,
} from "../hooks/usePatientsAPI";
import { useTimelineEntry } from "../hooks/useTimelineEntry";

export default () => {
  const [currentSelectedTabbarIndex, setCurrentSelectedTabbarIndex] =
    useState(0);
  const { patients, loading } = usePatientsAPI();
  const {
    update: updatePatient,
    new: newPatient,
    isSyncing,
    remove: removePatient,
  } = usePatientProfileMutation();

  const { addTimelineEntry, setTimelineEntry, timelineEntry, isWorking } =
    useTimelineEntry(patients[currentSelectedTabbarIndex]?.id);

  useEffect(() => {
    if (!patients.length) {
      return;
    }
    setCurrentSelectedTabbarIndex(patients.length - 1);
  }, [patients.length]);

  useEffect(() => {
    if (!patients.length && !loading) {
      newPatient();
    }
  }, [patients.length, loading]);

  if (loading) {
    return <div>{"reloading..."}</div>;
  }

  const currentPatient = patients[currentSelectedTabbarIndex];
  if (!currentPatient) {
    return <div>{"Working..."}</div>;
  }

  return (
    <div className={"AppContainer"}>
      <h1>COVID Timeline Generator</h1>{" "}
      <div className="SyncIndicator">
        {isSyncing ? "⏳ Syncing" : "👍🏽 Sync"}
      </div>
      <Tabbar
        selectedIndex={currentSelectedTabbarIndex}
        onChange={setCurrentSelectedTabbarIndex}
        items={patients.map((_, idx) => ({ label: "" + (idx + 1) }))}
        onAddButtonClick={newPatient}
      />
      {patients.length && (
        <>
          <div className="AppContainer__RemovePatientButtonWrapper">
            <RemovePatientButton
              disabled={patients.length < 2}
              onClick={() => {
                setCurrentSelectedTabbarIndex(currentSelectedTabbarIndex - 1);
                removePatient(currentPatient.id);
              }}
            />
          </div>
          <PatientInformation
            value={currentPatient}
            onChange={({ id, ...value }) => updatePatient(id, value)}
          />
          <h1>Timeline</h1>
          <div className="Timeline__Content">
            <div className="Timeline__Content__Entry">
              <PatientInformationBadge value={currentPatient} />
              <PatientTimeline patientTimeline={currentPatient.timeline} />
              <h3>Visited Places</h3>
              <VisitedPlace timeline={currentPatient.timeline} />
            </div>
            <PatientTimelineEntryForm
              isLoading={isWorking}
              onAddEntryClick={addTimelineEntry}
              value={timelineEntry}
              onChange={setTimelineEntry}
            />
          </div>
        </>
      )}
      <div className="Credit">
        Made With ❤️ Rungsikorn.R,{" "}
        <a style={{color: 'white'}} href="https://github.com/zapkub/opn-store-interview-challenge">
          Github
        </a>
      </div>
    </div>
  );
};
