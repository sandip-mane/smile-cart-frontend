import { QUERY_KEYS } from "constants/query";

import countriesApi from "apis/countries";
import statesApi from "apis/states";
import { prop } from "ramda";
import { useQuery } from "react-query";

export const useFetchCountries = params =>
  useQuery({
    queryKey: [QUERY_KEYS.COUNTRIES, params],
    queryFn: () => countriesApi.fetch(params),
    select: prop("countries"),
    staleTime: Infinity,
  });

export const useFetchStates = params =>
  useQuery({
    queryKey: [QUERY_KEYS.STATES, params],
    queryFn: () => statesApi.fetch(params),
    select: prop("states"),
    staleTime: Infinity,
  });
