import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import { SchemaTypeDefs } from '../apis/types';

type UsePatientsAPIResultData = {patients: SchemaTypeDefs.PatientProfile[]};
export const usePatientsAPI = () => {
  const { data = {patients: []}, loading, error } = useQuery<UsePatientsAPIResultData>(gql`
    query Query {
      patients {
        age
        gender
        occupation
        timeline {
            locationName
            from { rfc3339 }
            to { rfc3339 }
            locationType
            detail
        }
      }
    }
  `);

  return { patients: data.patients, loading, error };
};
