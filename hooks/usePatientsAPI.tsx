import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import { debounce } from "lodash";
import { nanoid } from "nanoid";
import {
  useCallback, useMemo,
  useState
} from "react";
import { SchemaTypeDefs } from "../apis/types";

type GetPatientsQuery = {
  patients: SchemaTypeDefs.PatientProfile[];
};
const GetPatientsQuery = gql`
  query GetPatients {
    patients {
      id
      age
      gender
      occupation
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

type UsePatientsAPIResultData = { patients: SchemaTypeDefs.PatientProfile[] };
export const usePatientsAPI = () => {
  const {
    data = { patients: [] },
    loading,
    error,
  } = useQuery<UsePatientsAPIResultData>(GetPatientsQuery);

  return { patients: data.patients, loading, error };
};

const UpdatePatientMutation = gql`
  mutation UpdatePatient($input: [PatientProfileInput!], $removeIds: [String!]!) {

    removePatients(ids: $removeIds)
    upsertPatients(input: $input) {
      id
      age
      gender
      occupation
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
export const usePatientProfileMutation = () => {
  const client = useApolloClient();
  const [isSyncing, setIsSyncing] = useState(false);

  const [pendingRemoveList, setPendingRemoveList] = useState<string[]>([]);

  const [upsertPatientMutate] = useMutation<
    { upsertPatients: SchemaTypeDefs.PatientProfile[] },
    { input: SchemaTypeDefs.PatientProfileInput[], removeIds: string[]  }
  >(UpdatePatientMutation);

  const sync = useCallback((removeIds: string[]) => {
    setIsSyncing(true);
    const newPatients = client
      .readQuery<{ patients: SchemaTypeDefs.PatientProfile[] }>({
        query: GetPatientsQuery,
      })
      ?.patients
      .map<SchemaTypeDefs.PatientProfileInput>((p) => {
        return {
          id: p.id.replace(/temp__/g, ""),
          age: p.age,
          gender: p.gender,
          occupation: p.occupation,
        };
      });

    /**
     * @todo implement abort controller
     */
    upsertPatientMutate({
      variables: {
        input: newPatients || [],
        removeIds: removeIds,
      },
      update: (cache, { data }) => {
        const { patients } = client.readQuery<GetPatientsQuery>({
          query: GetPatientsQuery,
        }) || { patients: [] };
        const merged = patients
          .filter(
            (p) =>
              !p.id.startsWith("temp") &&
              !data?.upsertPatients.find((i) => i.id === p.id)
          )
          .concat(data?.upsertPatients || []);
        cache.writeQuery({
          query: GetPatientsQuery,
          data: {
            patients: merged,
          },
        });
      },
      onCompleted: () => {
        setIsSyncing(false);
        setPendingRemoveList([])
      },
    });
  }, [client]);

  const debouncedSync = useMemo(() => debounce(sync, 1000), [sync]);

  const remove = useCallback((patientId: string) => {
    setIsSyncing(true);
    const patientsQuery = client.readQuery({
      query: GetPatientsQuery
    });
    const nextPatients = patientsQuery?.patients.filter(p => p.id !== patientId);
    client.writeQuery({
      data: {patients: nextPatients},
      query: GetPatientsQuery,
    })
    const nextPendingRemoveList = [...pendingRemoveList, patientId];
    setPendingRemoveList(nextPendingRemoveList);
    debouncedSync(nextPendingRemoveList);
  }, [client, pendingRemoveList])

  const update = useCallback(
    (data: SchemaTypeDefs.PatientProfileInput & { id: string }) => {
      setIsSyncing(true);
      client.writeFragment({
        data: data,
        fragment: gql`
          fragment NextValue on PatientProfile {
            id
            gender
            age
            occupation
          }
        `,
      });
      debouncedSync(pendingRemoveList);
    },
    [client, pendingRemoveList]
  );

  const newPatient = useCallback(() => {
    setIsSyncing(true);
    const result = client.readQuery({
      query: GetPatientsQuery,
    }) || { patients: [] };
    client.writeQuery({
      data: {
        patients: [
          ...result.patients,
          {
            ...SchemaTypeDefs.PatientProfileInput.new(),
            id: "temp__" + nanoid(),
            timeline: [],
          },
        ],
      },
      query: GetPatientsQuery,
    });

    debouncedSync(pendingRemoveList);
  }, [client, pendingRemoveList]);

  return {
    isSyncing,
    remove,
    update: (id: string, value: SchemaTypeDefs.PatientProfileInput) =>
      update({ id, ...value }),
    new: () => newPatient(),
  };
};
