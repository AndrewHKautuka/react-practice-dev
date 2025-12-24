import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { LANGUAGE_ISO_CODE } from "../constants"
import type { Country, CountryResponse, IsoCode } from "../types"
import { mapResponseToCountry } from "../utils"

export function useCountries(languageIsoCode: IsoCode = LANGUAGE_ISO_CODE) {
  return useQuery<Country[]>({
    queryKey: ["countries", languageIsoCode],
    queryFn: async () => await getCountries(languageIsoCode),
  })
}

async function getCountries(languageIsoCode: IsoCode): Promise<Country[]> {
  const { data: countries } = await axios.get<CountryResponse[]>(
    `https://openholidaysapi.org/Countries?languageIsoCode=${languageIsoCode}`
  )

  return countries.map((response) =>
    mapResponseToCountry(response, languageIsoCode)
  )
}
