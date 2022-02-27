import { useMutation } from "@apollo/client";
import { gql } from "apollo-server-core";
import { useCallback, useState } from "react";
import { SchemaTypeDefs } from "../apis/types";

type RemoveTimelineEntryMutationVariable = {
  patientId: string
  idx: number
}
const RemoveTimelineEntryMutation = gql`
  mutation RemoveTimelineEntry ($patientId: String!, $idx: Int!) {
    removeTimelineEntry(patientId: $patientId, entryIndex: $idx) {
      id
      timeline {
        locationName
        from {
          rfc3339
        }
        to {
          rfc3339
        }
        locationType
        detail
      }
    }
  }
`;

const AddTimelineEntryMutation = gql`
  mutation AddTimelineEntry(
    $patientId: String!
    $input: PatientTimelineEntryInput!
  ) {
    addTimelineEntry(patientId: $patientId, input: $input) {
      id
      timeline {
        locationName
        from {
          rfc3339
        }
        to {
          rfc3339
        }
        locationType
        detail
      }
    }
  }
`;
type AddTimelineEntryMutationData = {
  addTimelineEntry: SchemaTypeDefs.PatientProfile;
};
type AddTimelineEntryMutationVariable = {
  patientId: string;
  input: SchemaTypeDefs.PatientTimelineEntryInput;
};

export function useTimelineEntry(patientId?: string) {
  const [isWorking, setIsWorking] = useState(false);
  const [timelineEntry, setTimelineEntry] = useState(
    SchemaTypeDefs.PatientTimelineEntryInput.new()
  );
  const [addTimelineEntryMutate] = useMutation<
    AddTimelineEntryMutationData,
    AddTimelineEntryMutationVariable
  >(AddTimelineEntryMutation);

  const [removeTimelineEntryMutate] = useMutation<{}, RemoveTimelineEntryMutationVariable>(RemoveTimelineEntryMutation);

  const addTimelineEntry = useCallback(() => {
    if (!patientId) {
      return;
    }
    setIsWorking(true);
    addTimelineEntryMutate({
      variables: {
        input: timelineEntry,
        patientId,
      },
      onCompleted: () => {
        setIsWorking(false);
        setTimelineEntry(SchemaTypeDefs.PatientTimelineEntryInput.new());
      },
      onError: () => setIsWorking(false),
    });
  }, [patientId, timelineEntry, addTimelineEntryMutate]);

  const removeTimelineEntry = useCallback(
    (patientId: string, timelineEntryIndex: number) => {
      setIsWorking(true);
      removeTimelineEntryMutate({
        variables: {
          idx: timelineEntryIndex,
          patientId,
        },
        onCompleted: () => setIsWorking(false)
      })
    },
    [removeTimelineEntryMutate]
  );

  return {
    addTimelineEntry,
    removeTimelineEntry,
    isWorking,
    setTimelineEntry,
    timelineEntry,
  };
}
