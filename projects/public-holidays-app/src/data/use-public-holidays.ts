import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import type { HolidayResponse, IsoCode, PublicHoliday } from "../types"
import { mapResponseToPublicHoliday } from "../utils"

export function usePublicHolidays(countryIsoCode: IsoCode, year: number) {
  return useQuery<PublicHoliday[]>({
    queryKey: ["public-holiday", countryIsoCode, year],
    queryFn: async () => await getPublicHolidays(countryIsoCode, year),
  })
}

async function getPublicHolidays(
  countryIsoCode: IsoCode,
  year: number
): Promise<PublicHoliday[]> {
  const { data: holidays } = await axios.get<HolidayResponse[]>(
    `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=${year}-01-01&validTo=${year}-12-31`
  )

  return holidays.map((response) =>
    mapResponseToPublicHoliday(response, countryIsoCode)
  )
}
