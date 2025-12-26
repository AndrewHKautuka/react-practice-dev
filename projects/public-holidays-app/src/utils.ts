import type {
  Country,
  CountryResponse,
  HolidayResponse,
  IsoCode,
  PublicHoliday,
} from "./types"

export function mapResponseToCountry(
  response: CountryResponse,
  isoCode: IsoCode
): Country {
  return {
    isoCode: response.isoCode,
    name:
      response.name.find((name) => name.language === isoCode)?.text ??
      response.name?.[0]?.text ??
      "Unknown",
  }
}

export function mapResponseToPublicHoliday(
  response: HolidayResponse,
  isoCode: IsoCode
): PublicHoliday {
  return {
    id: response.id,
    date: response.startDate,
    name:
      response.name.find((name) => name.language === isoCode)?.text ??
      response.name?.[0]?.text ??
      "Unknown",
  }
}
